import pandas as pd
import numpy as np

def getNbBinomes(data):
    return len([header for header in data.columns if "Binôme" in header])

def getAllNuances(data, colNuance='CODNUA', fmt='exploded'):
    if fmt not in ['exploded', 'line']:
        raise ValueError("format parameter must be 'exploded' or 'line'")
    
    if fmt == 'exploded':
        return data[colNuance].unique()
    
    if fmt == 'line':
        nuances = np.array([])
        nuances_tmp = data[colNuance].fillna(0)
        for c in nuances_tmp:
            nuances = np.append(nuances, nuances_tmp[c])
        return np.unique(nuances[nuances!=0])


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


def prepareLabels(data, colVoix='NBRVOIX', colIns='NBRINS', colVot='NBRVOT', colExp='NBREXP', colNuance='CODNUA', colsSpec=['CODDPT', 'CODSUBCOM', 'CODBURVOT'],  fmt='exploded'):
    if fmt not in ['exploded', 'line']:
        raise ValueError("format parameter must be 'exploded' or 'line'")

    dataNuances = pd.DataFrame()
    dataVoix = pd.DataFrame()
    dataAutres = pd.DataFrame(columns=['Abstentions', 'BlancsNuls'])

    if fmt=='exploded':
        ids = data[colsSpec].drop_duplicates()

        for i, row in ids.iterrows():
            query = data.query(' and '.join([col+'=='+(f'"{row[col]}"' if data.dtypes[col]=='object' else str(row[col])) for col in colsSpec]))
            dataNuances = dataNuances.append(query[colNuance].reset_index(drop=True), ignore_index=True)
            dataVoix = dataVoix.append((query[colVoix]/query[colIns]).reset_index(drop=True), ignore_index=True)
            dataAutres = dataAutres.append(pd.concat([(query[colIns]-query[colVot])/query[colIns], (query[colVot]-query[colExp])/query[colIns]], axis=1).drop_duplicates().rename(columns={0: 'Abstentions', 1: 'BlancsNuls'}), ignore_index=True)

        nuances = getAllNuances(data, colNuance=colNuance, fmt=fmt)
        y = pd.DataFrame(0, columns=nuances, index=dataNuances.index)
        tot = len(dataNuances)
        for i in dataNuances.index:
            print(i*100/tot,'%')
            y.loc[i, dataNuances.loc[i]] = dataVoix.loc[i].values
        y = pd.concat([y[nuances], dataAutres], axis=1)
        return y
        
    if fmt=='line':
        nuances = getAllNuances(data, colNuance=colNuance, fmt=fmt)
        y = pd.DataFrame(0, columns=nuances, index=data.index)
        for n in nuances:
            for i in range(getNbBinomes(data)):
                y[n][data['Nuance.'+str(i) if i!=0 else 'Nuance']==n] += data['Voix.'+str(i) if i!=0 else 'Voix'][data['Nuance.'+str(i) if i!=0 else 'Nuance']==n]

        y = y.divide(data[colIns], axis=0)
        dataAutres = pd.concat([(data[colIns]-data[colVot])/data[colIns], (data[colVot]-data[colExp])/data[colIns]], axis=1).rename(columns={0: 'Abstentions', 1: 'BlancsNuls'})
        y = pd.concat([y[nuances], dataAutres], axis=1)
        return y





def prepareInputData(data):
    # # Tout d'abord on encode les valeurs des départements en one hot encoding
    # dpts = data["Code du département"].unique()
    # oneHot = pd.DataFrame(0, index=pd.RangeIndex(len(data)), columns=dpts)
    pass
    
    
    


if __name__ == '__main__':

    print('Loading data... ', end='')
    dataFR = pd.read_excel("dataset/DataCantonsT2.xlsx")
    # data = pd.read_csv('dataset/DP15_Bvot_T1T2.txt', delimiter=';')
    # dataT2 = data[data.NUMTOUR==2]
    print('OK')

    print('Preparing labels... ', end='')
    # y = prepareLabels(dataT2)
    # y.to_csv('dataset/yDataFR_Bvot_DP.csv', sep=';')

    y = prepareLabels(dataFR, colVoix=['Voix.'+str(i) if i!=0 else 'Voix' for i in range(getNbBinomes(dataFR))],
                              colNuance=['Nuance.'+str(i) if i!=0 else 'Nuance' for i in range(getNbBinomes(dataFR))], 
                              colIns='Inscrits',
                              colVot='Votants',
                              colExp='Exprimés',
                              fmt='line')
    y.to_csv('dataset/yDataFR_Canton_DP.csv', sep=';')
    print('OK')



    # explodeLines(dataCher).sort_values('Code du canton').to_excel('dataset/datasheetT2.xlsx')





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