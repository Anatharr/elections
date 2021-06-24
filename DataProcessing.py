import pandas as pd
import numpy as np

def getNbBinomes(data):
    return len([header for header in data.columns if "Binôme" in header])

def getAllNuances(data, colNuance='CODNUA', fmt='exploded'):
    if fmt not in ['exploded', 'line']:
        raise ValueError("format parameter must be 'exploded' or 'line'")
    
    if fmt == 'exploded':
        nuances = data[colNuance].unique()
    
    if fmt == 'line':
        nuances = np.array([])
        nuances_tmp = data[colNuance].fillna(0)
        for c in nuances_tmp:
            nuances = np.append(nuances, nuances_tmp[c])
        nuances = np.unique(nuances[nuances!=0])
    
    return sorted(nuances)


def explodeLines(data):
    initdf = data[['Code du département', 'Libellé du département', 'Code du canton', 
            'Libellé du canton', 'Inscrits', 'Abstentions', '% Abs/Ins', 'Votants',
            '% Vot/Ins', 'Blancs', '% Blancs/Ins', '% Blancs/Vot', 'Nuls', '% Nuls/Ins',
            '% Nuls/Vot', 'Exprimés', '% Exp/Ins', '% Exp/Vot']]
    headers = ['N°Panneau', 'Nuance', 'Binôme', 'Sièges', 'Voix', '% Voix/Ins', '% Voix/Exp']
    
    df = pd.DataFrame()
    for i in range(getNbBinomes(data)):
        partidf = data[[h+'.'+str(i) if i!=0 else h for h in headers]]
        partidf = pd.concat([initdf, partidf], axis=1)
        partidf.columns = pd.Index(initdf.columns.values.tolist() + headers)
        df = pd.concat([df, partidf])
    
    # Remove useless rows
    df = df.dropna(how='all', subset=headers)
    
    return df


def prepareLabelsLine(data):
    nuances = getAllNuances(data, colNuance=['Nuance.'+str(i) if i!=0 else 'Nuance' for i in range(getNbBinomes(dataT2Can ))], fmt='line')
    y = pd.DataFrame(0, columns=nuances, index=data.index)
    for n in nuances:
        for i in range(getNbBinomes(data)):
            y[n][data['Nuance.'+str(i) if i!=0 else 'Nuance']==n] += data['Voix.'+str(i) if i!=0 else 'Voix'][data['Nuance.'+str(i) if i!=0 else 'Nuance']==n]

    y = y.divide(data['Inscrits'], axis=0)
    dataAutres = pd.concat([(data['Inscrits']-data['Votants'])/data['Inscrits'], (data['Votants']-data['Exprimés'])/data['Inscrits']], axis=1).rename(columns={0: 'Abstentions', 1: 'BlancsNuls'})
    y = pd.concat([y[nuances], dataAutres], axis=1)

    y.index = pd.MultiIndex.from_frame(data[['Code du département', 'Code du canton']], names=['CODDPT', 'CODCAN'])
    return y


# def prepareLabelsExploded(data):
#     ids = data[['CODDPT', 'CODSUBCOM', 'CODCAN', 'CODBURVOT']].drop_duplicates()
#     dataNuances = pd.DataFrame()
#     dataVoix = pd.DataFrame()
#     dataAutres = pd.DataFrame(columns=['Abstentions', 'BlancsNuls'])

#     for i, row in ids.iterrows():
#         query = data.query(' and '.join([col+'=='+(f'"{row[col]}"' if data.dtypes[col]=='object' else str(row[col])) for col in ['CODDPT', 'CODSUBCOM', 'CODBURVOT']]))
#         dataNuances = dataNuances.append(query['CODNUA'].reset_index(drop=True), ignore_index=True)
#         dataVoix = dataVoix.append((query['NBRVOIX']/query['NBRINS']).reset_index(drop=True), ignore_index=True)
#         dataAutres = dataAutres.append(pd.concat([(query['NBRINS']-query['NBRVOT'])/query['NBRINS'], (query['NBRVOT']-query['NBREXP'])/query['NBRINS']], axis=1).drop_duplicates().rename(columns={0: 'Abstentions', 1: 'BlancsNuls'}), ignore_index=True)

#     nuances = getAllNuances(data, colNuance='CODNUA', fmt='exploded')
#     y = pd.DataFrame(0, columns=nuances, index=dataNuances.index)
#     tot = len(dataNuances)
#     for i in dataNuances.index:
#         print(i*100/tot,'%')
#         y.loc[i, dataNuances.loc[i]] = dataVoix.loc[i].values
#     y = pd.concat([y[nuances], dataAutres], axis=1)

#     return y



def prepareLabelsExploded(data, oneHotEncode=False):
    nuances = getAllNuances(data)
    idFeatures = ['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT']

    exprimes = data[idFeatures+['NBREXP']].groupby(idFeatures).first()

    # Create [%Voix] and fill it
    voix = pd.DataFrame(0, index=data.index, columns=nuances)
    for parti in nuances:
        voix[parti][data['CODNUA']==parti] = data[data['CODNUA']==parti]['NBRVOIX']
    voix = pd.concat([data[idFeatures], voix], axis=1).groupby(idFeatures).sum().sort_values(idFeatures)[nuances]

    # Concat with computed stats and divide voix by exprimes
    y = voix.divide(exprimes['NBREXP'], axis=0)
    return y
    
    


def prepareInputDataExploded(data):
    tmp = data[['NUMTOUR', 'CODDPT', 'CODSUBCOM', 'LIBSUBCOM', 'CODBURVOT', 'CODCAN',
            'LIBCAN', 'NBRINS', 'NBRVOT', 'NBREXP', 'CODNUA', 'NBRVOIX']].copy()

    # Compute missing data
    tmp['NBRABS'] = tmp['NBRINS'] - tmp['NBRVOT']
    tmp['NBRBLCNUL'] = tmp['NBRVOT'] - tmp['NBREXP']
    tmp['%ABS/INS'] = tmp['NBRABS'] / tmp['NBRINS']
    tmp['%BLCNUL/VOT'] = tmp['NBRBLCNUL'] / tmp['NBRVOT']
    tmp['%EXP/VOT'] = tmp['NBREXP'] / tmp['NBRVOT']
    tmp['%VOIX/EXP'] = tmp['NBRVOIX'] / tmp['NBREXP']

    nuances = getAllNuances(data)
    statsFeatures = ['NBRINS', 'NBREXP', '%ABS/INS', '%BLCNUL/VOT', '%EXP/VOT']
    idFeatures = ['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT']

    exprimes = tmp[idFeatures + ['NBREXP']].drop_duplicates().sort_values(idFeatures)['NBREXP']
    stats = tmp[idFeatures + statsFeatures].drop_duplicates()[statsFeatures]
    ids = tmp[idFeatures].drop_duplicates()

    # Create [%Voix] and fill it
    voix = pd.DataFrame(0, index=data.index, columns=nuances)
    for parti in nuances:
        voix[parti][data['CODNUA']==parti] = tmp[tmp['CODNUA']==parti]['NBRVOIX']
    voix = pd.concat([tmp[idFeatures], voix], axis=1).groupby(idFeatures).sum()[nuances]
    voix.index = exprimes.index

    # Concat with computed stats and divide almost everything by Exprimés
    voix = voix.divide(exprimes, axis=0)
    X = pd.concat([stats, voix], axis=1)
    X.index = pd.MultiIndex.from_frame(ids)
    return X.sort_values(['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT'])
    


if __name__ == '__main__':

    print('Loading Bvot data... ', end='')
    dtypes = {
        'NUMTOUR' :    'int64',
        'CODDPT' :    'object',
        'CODSUBCOM' :  'int64',
        'LIBSUBCOM' : 'object',
        'CODBURVOT' : 'object',
        'CODCAN' :     'int64',
        'LIBCAN' :    'object',
        'NBRINS' :     'int64',
        'NBRVOT' :     'int64',
        'NBREXP' :     'int64',
        'NUMDEPCAND' : 'int64',
        'LIBLISEXT' : 'object',
        'CODNUA' :    'object',
        'NBRVOIX' :    'int64',
    }
    dataBvot = pd.read_csv('dataset/raw/DP15_Bvot_T1T2.csv', delimiter=';', dtype=dtypes)
    dataT1Bvot = dataBvot[dataBvot.NUMTOUR==1]
    dataT2Bvot = dataBvot[dataBvot.NUMTOUR==2]
    print('OK')

    print('Preparing input data... ', end='')
    X = prepareInputDataExploded(dataT1Bvot[dataT1Bvot['CODDPT']=='18'])
    X.to_csv("dataset/inputs/XDataCher_Bvot.csv", sep=';')
    print('OK')

    print(X)


    # print('Loading Cantons data... ', end='')
    # dataT2Can = pd.read_excel("dataset/Dep_15_Resultats_T2_complet.xlsx", sheet_name='Cantons')
    # print('OK')

    print('Preparing labels... ', end='')
    y = prepareLabelsExploded(dataT2Bvot[dataT2Bvot['CODDPT']=='18'])
    y.to_csv('dataset/labels/yDataCher_Bvot.csv', sep=';')
    print('OK')

    print(y)



#model representation with Embedding
# input = tf.keras.Input(shape=(100,), dtype='int32', name='input')
# x = tf.keras.layers.Embedding(
#     output_dim=512, input_dim=10000, input_length=100)(input)
# x = tf.keras.layers.LSTM(32)(x)
# x = tf.keras.layers.Dense(64, activation='relu')(x)
# x = tf.keras.layers.Dense(64, activation='relu')(x)
# x = tf.keras.layers.Dense(64, activation='relu')(x)
# output = tf.keras.layers.Dense(1, activation='sigmoid', name='output')(x)
# model = tf.keras.Model(inputs=[input], outputs=[output])
# dot_img_file = '/tmp/model_1.png'
# tf.keras.utils.plot_model(model, to_file=dot_img_file, show_shapes=True)