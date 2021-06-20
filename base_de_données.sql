CREATE TABLE T1_2011
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton Varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,3),
    nb_votants int,
    vot_pourcent_ins numeric(10,3),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,3),
    blancs_nuls_pourcent_vot numeric(10,3),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,3),
    exp_pourcent_vot numeric(10,3),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,3),
    voix_pourcent_exp_liste_1 numeric(10,3),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,3),
    voix_pourcent_exp_liste_2 numeric(10,3),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,3),
    voix_pourcent_exp_liste_3 numeric(10,3),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,3),
    voix_pourcent_exp_liste_4 numeric(10,3),
    sexe_liste_5 varchar(5),
    nom_liste_5 varchar(30),
    prenom_liste_5 varchar(30),
    nuance_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,3),
    voix_pourcent_exp_liste_5 numeric(10,3),
    sexe_liste_6 varchar(5),
    nom_liste_6 varchar(30),
    prenom_liste_6 varchar(30),
    nuance_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,3),
    voix_pourcent_exp_liste_6 numeric(10,3),
    sexe_liste_7 varchar(5),
    nom_liste_7 varchar(30),
    prenom_liste_7 varchar(30),
    nuance_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,3),
    voix_pourcent_exp_liste_7 numeric(10,3),
    sexe_liste_8 varchar(5),
    nom_liste_8 varchar(30),
    prenom_liste_8 varchar(30),
    nuance_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,3),
    voix_pourcent_exp_liste_8 numeric(10,3),
    sexe_liste_9 varchar(5),
    nom_liste_9 varchar(30),
    prenom_liste_9 varchar(30),
    nuance_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,3),
    voix_pourcent_exp_liste_9 numeric(10,3),
    sexe_liste_10 varchar(5),
    nom_liste_10 varchar(30),
    prenom_liste_10 varchar(30),
    nuance_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,3),
    voix_pourcent_exp_liste_10 numeric(10,3),
    sexe_liste_11 varchar(5),
    nom_liste_11 varchar(30),
    prenom_liste_11 varchar(30),
    nuance_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,3),
    voix_pourcent_exp_liste_11 numeric(10,3),
    sexe_liste_12 varchar(5),
    nom_liste_12 varchar(30),
    prenom_liste_12 varchar(30),
    nuance_liste_12 varchar(10),
    nb_voix_liste_12 int,
    voix_pourcent_ins_liste_12 numeric(10,3),
    voix_pourcent_exp_liste_12 numeric(10,3),
    sexe_liste_13 varchar(5),
    nom_liste_13 varchar(30),
    prenom_liste_13 varchar(30),
    nuance_liste_13 varchar(10),
    nb_voix_liste_13 int,
    voix_pourcent_ins_liste_13 numeric(10,3),
    voix_pourcent_exp_liste_13 numeric(10,3)
);

COPY T1_2011 
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2011_tour_1.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

CREATE TABLE T2_2011
(
    num_departement varchar(3)
);


CREATE TABLE T1_2015
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,3),
    nb_votants int,
    vot_pourcent_ins numeric(10,3),
    nb_blancs int,
    blancs_pourcent_ins numeric(10,3),
    blancs_pourcent_vot numeric(10,3),
    nb_nuls int,
    nuls_pourcent_ins numeric(10,3),
    nuls_pourcent_vot numeric(10,3),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,3),
    exp_pourcent_vot numeric(10,3),
    num_panneau_liste_1 int,
    nuance_liste_1 varchar(20),
    binome_liste_1 varchar(150),
    sieges_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,3),
    voix_pourcent_exp_liste_1 numeric(10,3),
    num_panneau_liste_2 int,
    nuance_liste_2 varchar(20),
    binome_liste_2 varchar(150),
    sieges_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,3),
    voix_pourcent_exp_liste_2 numeric(10,3),
    num_panneau_liste_3 int,
    nuance_liste_3 varchar(20),
    binome_liste_3 varchar(150),
    sieges_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,3),
    voix_pourcent_exp_liste_3 numeric(10,3),
    num_panneau_liste_4 int,
    nuance_liste_4 varchar(20),
    binome_liste_4 varchar(150),
    sieges_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,3),
    voix_pourcent_exp_liste_4 numeric(10,3),
    num_panneau_liste_5 int,
    nuance_liste_5 varchar(20),
    binome_liste_5 varchar(150),
    sieges_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,3),
    voix_pourcent_exp_liste_5 numeric(10,3),
    num_panneau_liste_6 int,
    nuance_liste_6 varchar(20),
    binome_liste_6 varchar(150),
    sieges_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,3),
    voix_pourcent_exp_liste_6 numeric(10,3),
    num_panneau_liste_7 int,
    nuance_liste_7 varchar(20),
    binome_liste_7 varchar(150),
    sieges_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,3),
    voix_pourcent_exp_liste_7 numeric(10,3),
    num_panneau_liste_8 int,
    nuance_liste_8 varchar(20),
    binome_liste_8 varchar(150),
    sieges_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,3),
    voix_pourcent_exp_liste_8 numeric(10,3),
    num_panneau_liste_9 int,
    nuance_liste_9 varchar(20),
    binome_liste_9 varchar(150),
    sieges_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,3),
    voix_pourcent_exp_liste_9 numeric(10,3),
    num_panneau_liste_10 int,
    nuance_liste_10 varchar(20),
    binome_liste_10 varchar(150),
    sieges_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,3),
    voix_pourcent_exp_liste_10 numeric(10,3),
    num_panneau_liste_11 int,
    nuance_liste_11 varchar(20),
    binome_liste_11 varchar(150),
    sieges_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,3),
    voix_pourcent_exp_liste_11 numeric(10,3),
    num_panneau_liste_12 int,
    nuance_liste_12 varchar(20),
    binome_liste_12 varchar(150),
    sieges_liste_12 varchar(10),
    nb_voix_liste_12 int,
    voix_pourcent_ins_liste_12 numeric(10,3),
    voix_pourcent_exp_liste_12 numeric(10,3),
    PRIMARY KEY (num_departement, code_canton)
);

COPY T1_2015 
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2015_tour_1.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

CREATE TABLE T2_2015
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,3),
    nb_votants int,
    vot_pourcent_ins numeric(10,3),
    nb_blancs int,
    blancs_pourcent_ins numeric(10,3),
    blancs_pourcent_vot numeric(10,3),
    nb_nuls int,
    nuls_pourcent_ins numeric(10,3),
    nuls_pourcent_vot numeric(10,3),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,3),
    exp_pourcent_vot numeric(10,3),
    num_panneau_liste_1 int,
    nuance_liste_1 varchar(20),
    binome_liste_1 varchar(150),
    sieges_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,3),
    voix_pourcent_exp_liste_1 numeric(10,3),
    num_panneau_liste_2 int,
    nuance_liste_2 varchar(20),
    binome_liste_2 varchar(150),
    sieges_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,3),
    voix_pourcent_exp_liste_2 numeric(10,3),
    num_panneau_liste_3 int,
    nuance_liste_3 varchar(20),
    binome_liste_3 varchar(150),
    sieges_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,3),
    voix_pourcent_exp_liste_3 numeric(10,3),
    PRIMARY KEY (num_departement, code_canton)
);

COPY T2_2015 
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2015_tour_2.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');