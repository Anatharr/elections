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


def deExplodeLines(data):
    df = pd.DataFrame()
    for index, row in data[['Département', 'Code du Canton']].drop_duplicates().iterrows():
        can = data[(data['Département']==row['Département']) & (data['Code du Canton']==row['Code du Canton'])]
        header = can[['Département', 'Code du Canton', 'Libellé du Canton', 'Inscrits',
           'Abstentions', 'Votants', 'Blancs', 'Nuls', 'Exprimés']].iloc[0]
        canstack = can[['Binôme', 'Nuance', 'Voix', '%Voix/Exp']].stack()
        canstack.index = [c+'_'+str(i) for i in range(len(can)) for c in ['Binôme', 'Nuance', 'Voix', '%Voix/Exp']]
        canstack = canstack.append(header)
        df = df.append(canstack, ignore_index=True)

    df = df.reindex(['Département', 'Code du Canton', 'Libellé du Canton', 'Inscrits',
           'Abstentions', 'Votants', 'Blancs', 'Nuls', 'Exprimés'] + [c+'_'+str(i) for i in range(getNbBinomes(df)) for c in ['Binôme', 'Nuance', 'Voix', '%Voix/Exp']], axis=1)
    df = df.sort_values(['Département', 'Code du Canton'])
    df = df.reset_index(drop=True)
    return df


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
    
    


def prepareInputDataExploded(dataBvot, dataCanton):
    tmp = dataBvot[['NUMTOUR', 'CODDPT', 'CODSUBCOM', 'LIBSUBCOM', 'CODBURVOT', 'CODCAN',
            'LIBCAN', 'NBRINS', 'NBRVOT', 'NBREXP', 'CODNUA', 'NBRVOIX']].copy()

    #dictionnaire des duels
    duels = dict()
    count=0
    for dep in dataCanton['Code du département'].unique():
        duels[str(dep)], count = getDuels(dataCanton, dep, count=count)
        if duels[str(dep)]==[]:
            print('empty list for dep : ', dep)

    #dictionnaire optimisé
    optDuels = optimizeDuelDict(duels)
    winnersT1 = [duel.split(':') for duel in list(optDuels.keys()) if len(duel.split(':'))<2]

    correction = [str(i) for i in range(1,10)]
    for winner in winnersT1:
         for dep, can in optDuels[winner[0]]:
            if dep in correction:
                tmp = tmp.loc[~((tmp['CODDPT']=='0'+dep) & (tmp['CODCAN']==int(can)))]
            else:
                tmp = tmp.loc[~((tmp['CODDPT']==dep) & (tmp['CODCAN']==int(can)))]
    
    # Compute missing dataBvot
    tmp['NBRABS'] = tmp['NBRINS'] - tmp['NBRVOT']
    tmp['NBRBLCNUL'] = tmp['NBRVOT'] - tmp['NBREXP']
    tmp['%ABS/INS'] = tmp['NBRABS'] / tmp['NBRINS']
    tmp['%BLCNUL/VOT'] = tmp['NBRBLCNUL'] / tmp['NBRVOT']
    tmp['%EXP/VOT'] = tmp['NBREXP'] / tmp['NBRVOT']
    tmp['%VOIX/EXP'] = tmp['NBRVOIX'] / tmp['NBREXP']

    nuances = getAllNuances(dataBvot)
    statsFeatures = ['NBRINS', 'NBREXP', '%ABS/INS', '%BLCNUL/VOT', '%EXP/VOT']
    idFeatures = ['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT']

    exprimes = tmp[idFeatures + ['NBREXP']].drop_duplicates().sort_values(idFeatures)['NBREXP']
    stats = tmp[idFeatures + statsFeatures].drop_duplicates()[statsFeatures]
    ids = tmp[idFeatures].drop_duplicates()

    # Create [%Voix] and fill it
    voix = pd.DataFrame(0, index=dataBvot.index, columns=nuances)
    for parti in nuances:
        voix.loc[dataBvot['CODNUA']==parti, parti] = tmp[tmp['CODNUA']==parti]['NBRVOIX']
    voix = pd.concat([tmp[idFeatures], voix], axis=1).groupby(idFeatures).sum()[nuances]
    voix.index = exprimes.index

    # Concat with computed stats and divide almost everything by Exprimés
    voix = voix.divide(exprimes, axis=0)
    X = pd.concat([stats, voix], axis=1)
    X.index = pd.MultiIndex.from_frame(ids)
    return X.sort_values(['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT'])
    

def convertToMultiIndex(data, idFeatures=['CODDPT', 'CODCAN', 'CODSUBCOM', 'CODBURVOT']):
    ret = data.copy()
    ret.index = pd.MultiIndex.from_frame(ret[idFeatures])
    return ret.drop(idFeatures, axis='columns')


#################################### Dictionnaire des duels #####################################

def getNuanceOfElected(data, col_siege='Sièges', col_nuance='Nuance'):
    elected = data[data[col_siege]=='Elus']
    return list(elected[col_nuance]) if len(elected)!=0 else None

def filterBestNuances(data, col_nuance='Nuance', criteria=12.50):
    bestCandidat = data[data['% Voix/Ins']>= criteria]
    
    if bestCandidat.empty or len(bestCandidat)==1:
        bestCandidat = data.sort_values(by='Voix', ascending=False).iloc[0:2,:]

    return list(bestCandidat[col_nuance])

def getDuels(data, dep, col_dep='Code du département', col_canton='Code du canton', col_siege='Sièges', col_nuance='Nuance',count=None):
    '''
        ATTENTION : data doit etre EXPLODE !
    '''
    data = data[data[col_dep]==dep]
    duels = dict()
    for canton in data[col_canton].unique():
        data_canton = data[data[col_canton]==canton]
        # allow to know if there is a majority in the canton
        elected = getNuanceOfElected(data_canton, col_siege=col_siege, col_nuance=col_nuance) 
        
        if elected is not None:
            count+=1
            duels[str(canton)]= elected
        else:
            duels[str(canton)] = filterBestNuances(data_canton)
    return (duels, count) if count is not None else duels

def optimizeDuelDict(duels):
    optdic = dict()
    for dep, duelDepDict in duels.items():
        for canton, duelList in duelDepDict.items():
            key = ':'.join(duelList)
            if key in optdic.keys():
                optdic[key].append((dep, canton))
            else:
                optdic[key]= [(dep, canton)]
    return optdic



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

    print('Loading Cantons data... ', end='')
    dataT1Can = pd.read_excel("dataset/raw/Dep_15_Resultats_T1_complet.xlsx", sheet_name='Cantons', header=2)
    print('OK')

    dataT1CanExploded = explodeLines(dataT1Can)

    print('Preparing input data... ', end='')
    X = prepareInputDataExploded(dataT1Bvot, dataT1CanExploded)
    X.to_csv("dataset/inputs/XDataFR_Bvot.csv", sep=';')
    print('OK')


    print('Preparing labels... ', end='')
    y = prepareLabelsExploded(dataT2Bvot)
    y.to_csv('dataset/labels/yDataFR_Bvot.csv', sep=';')
    print('OK')

    print(X.shape, y.shape)


    # dtypes = {
    #     'Département':       'object',
    #     'Code du Canton':    'int64',
    #     'Libellé du Canton': 'object',
    #     'Inscrits':          'int64',
    #     'Abstentions':       'int64',
    #     'Votants':           'int64',
    #     'Blancs':            'int64',
    #     'Nuls':              'int64',
    #     'Exprimés':          'int64',
    # }
    # print('Loading Cantons data... ', end='')
    # dataT1Can = pd.read_csv("dataset/raw/Dep_21_CanLine.csv", sep=';', dtype=dtypes)
    # print('OK')

    # print(dataT1Can.dtypes)

    # dataT1Can.to_csv("dataset/raw/Dep_21_CanLine.csv", sep=';', index=False)




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