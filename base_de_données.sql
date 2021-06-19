PRAGMA foreign_keys = ON;

CREATE TABLE T1_2015
(
    num_departement int,
    nom_departement char[35] PRIMARY KEY,
    code_canton int,
    nom_canton char[50],
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins float,
    nb_votants int,
    vot_pourcent_ins float,
    nb_blancs int,
    blancs_pourcent_ins float,
    blancs_pourcent_vot float,
    nb_nuls int,
    nuls_pourcent_ins float,
    nuls_pourcent_vot float,
    nb_exprimés int,
    exp_pourcent_ins float,
    exp_pourcent_vot float,
    num_panneau_liste_1 int,
    nuance_liste_1 char[20],
    binome_liste_1 char[150],
    nb_sieges_liste_1 int,
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 float,
    voix_pourcent_exp_liste_1 float,
    num_panneau_liste_2 int,
    nuance_liste_2 char[20],
    binome_liste_2 char[150],
    nb_sieges_liste_2 int,
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 float,
    voix_pourcent_exp_liste_2 float,
    num_panneau_liste_3 int,
    nuance_liste_3 char[20],
    binome_liste_3 char[150],
    nb_sieges_liste_3 int,
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 float,
    voix_pourcent_exp_liste_3 float,
    num_panneau_liste_4 int,
    nuance_liste_4 char[20],
    binome_liste_4 char[150],
    nb_sieges_liste_4 int,
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 float,
    voix_pourcent_exp_liste_4 float,
    num_panneau_liste_5 int,
    nuance_liste_5 char[20],
    binome_liste_5 char[150],
    nb_sieges_liste_5 int,
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 float,
    voix_pourcent_exp_liste_5 float,
    num_panneau_liste_6 int,
    nuance_liste_6 char[20],
    binome_liste_6 char[150],
    nb_sieges_liste_6 int,
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 float,
    voix_pourcent_exp_liste_6 float,
    num_panneau_liste_7 int,
    nuance_liste_7 char[20],
    binome_liste_7 char[150],
    nb_sieges_liste_7 int,
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 float,
    voix_pourcent_exp_liste_7 float,
    num_panneau_liste_8 int,
    nuance_liste_8 char[20],
    binome_liste_8 char[150],
    nb_sieges_liste_8 int,
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 float,
    voix_pourcent_exp_liste_8 float,
    num_panneau_liste_9 int,
    nuance_liste_9 char[20],
    binome_liste_9 char[150],
    nb_sieges_liste_9 int,
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 float,
    voix_pourcent_exp_liste_9 float,
    num_panneau_liste_10 int,
    nuance_liste_10 char[20],
    binome_liste_10 char[150],
    nb_sieges_liste_10 int,
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 float,
    voix_pourcent_exp_liste_10 float
);

CREATE TABLE T2_2015
(
    num_departement int, 
    nom_departement char[35] PRIMARY KEY,
    code_canton int,
    nom_canton char[50],
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins float,
    nb_votants int,
    vot_pourcent_ins float,
    nb_blancs int,
    blancs_pourcent_ins float,
    blancs_pourcent_vot float,
    nb_nuls int,
    nuls_pourcent_ins float,
    nuls_pourcent_vot float,
    nb_exprimés int,
    exp_pourcent_ins float,
    exp_pourcent_vot float,
    num_panneau_liste_1 int,
    nuance_liste_1 char[20],
    binome_liste_1 char[150],
    nb_sieges_liste_1 int,
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 float,
    voix_pourcent_exp_liste_1 float,
    num_panneau_liste_2 int,
    nuance_liste_2 char[20],
    binome_liste_2 char[150],
    nb_sieges_liste_2 int,
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 float,
    voix_pourcent_exp_liste_2 float,
    num_panneau_liste_3 int,
    nuance_liste_3 char[20],
    binome_liste_3 char[150],
    nb_sieges_liste_3 int,
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 float,
    voix_pourcent_exp_liste_3 float

);

CREATE TABLE inter_T1_2015(LIKE T1_2015);

COPY inter_T1_2015 *
FROM 'Departementales_cantons_2015_tour_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

CREATE TABLE inter_T2_2015 (LIKE T2_2015);

COPY inter_T2_2015 *
FROM 'Departementales_cantons 2015_tour_2.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

INSERT INTO T1_2015
SELECT *
FROM 'Departementales_cantons_2015_tour_1.csv';

INSERT INTO T2_2015
SELECT *
FROM inter_T2_2015;
