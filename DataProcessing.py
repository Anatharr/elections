import pandas as pd
import numpy as np


def getNbBinomes(data):
    return len([header for header in data.columns if "Binôme" in header])

def getAllNuances(data):
    nuances = np.array([])
    nuances_tmp = data[['Nuance'+'.'+str(i) if i!=0 else 'Nuance' for i in range(getNbBinomes(data))]].fillna(0)
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
    useless_rows = pd.isnull(df[headers]).all(axis=1)
    df = df[~useless_rows]
    
    return df


def prepareOutputData(data):
    nuances = getAllNuances(data)
    y = pd.DataFrame(0, columns=nuances, index=data.index)
    dataNuances = data[['Nuance.'+str(i) if i!=0 else "Nuance" for i in range(getNbBinomes(data))]]
    dataVoix = data[['% Voix/Ins.'+str(i) if i!=0 else "% Voix/Ins" for i in range(getNbBinomes(data))]]

    for i in data.index:
        y.loc[i, dataNuances.loc[i]] = dataVoix.loc[i].values

    y = pd.concat([y[nuances], data[["% Blancs/Ins", "% Nuls/Ins", "% Abs/Ins"]]], axis=1)
    return y



if __name__ == '__main__':
    dataFR = pd.read_excel("dataset/DataCantonsT2.xlsx")
    dataCher = dataFR[dataFR["Libellé du département"]=='CHER']
    # print(dataFR.head(0).columns)

    prepareOutputData(dataCher).to_excel('dataset/yDataCher.xlsx')
    # explodeLines(dataCher).sort_values('Code du canton').to_excel('dataset/datasheetT2.xlsx')
