import matplotlib.pyplot as plt
import seaborn as sb
import pandas as pd
import numpy as np


def getAllNuances(data, n):
	nuances = np.array([])
	nuances_tmp = data[['Nuance'+'.'+str(i) if i!=0 else 'Nuance' for i in range(n)]].fillna(0)
	for c in nuances_tmp:
		nuances = np.append(nuances, nuances_tmp[c])
	return np.unique(nuances[nuances!=0])


def explodeLines(data, n):
	initdf = data[['Code du département', 'Libellé du département', 'Code du canton', 
			'Libellé du canton', 'Inscrits', 'Abstentions', '% Abs/Ins', 'Votants',
			'% Vot/Ins', 'Blancs', '% Blancs/Ins', '% Blancs/Vot', 'Nuls', '% Nuls/Ins',
			'% Nuls/Vot', 'Exprimés', '% Exp/Ins', '% Exp/Vot']]

	headers = ['N°Panneau', 'Nuance', 'Binôme', 'Sièges', 'Voix', '% Voix/Ins', '% Voix/Exp']

	df = pd.DataFrame()
	for i in range(n):
		partidf = data[[h+'.'+str(i) if i!=0 else h for h in headers]]
		partidf = pd.concat([initdf, partidf], axis=1)
		partidf.columns = pd.Index(initdf.columns.values.tolist() + headers)
		df = pd.concat([df, partidf])

	# Remove useless rows
	useless_rows = pd.isnull(df[headers]).all(axis=1)
	df = df[~useless_rows]

	return df


if __name__ == '__main__':
	n = 11 # Nombre de panneaux par ligne sur le dataset -1
	dataFR = pd.read_excel("dataset/DataCantonsT2.xlsx")
	dataCher = dataFR[dataFR["Libellé du département"]=='CHER']
	# print(dataFR.head(0).columns)

	print(getAllNuances(dataCher, n))
	explodeLines(dataCher, n).sort_values('Code du canton').to_excel('dataset/datasheetT2.xlsx')
