-- Table des résultats aux élections départementales 2011 tour 1 par cantons

CREATE TABLE t1_2011_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton Varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    sexe_liste_5 varchar(5),
    nom_liste_5 varchar(30),
    prenom_liste_5 varchar(30),
    nuance_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,2),
    voix_pourcent_exp_liste_5 numeric(10,2),
    sexe_liste_6 varchar(5),
    nom_liste_6 varchar(30),
    prenom_liste_6 varchar(30),
    nuance_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,2),
    voix_pourcent_exp_liste_6 numeric(10,2),
    sexe_liste_7 varchar(5),
    nom_liste_7 varchar(30),
    prenom_liste_7 varchar(30),
    nuance_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,2),
    voix_pourcent_exp_liste_7 numeric(10,2),
    sexe_liste_8 varchar(5),
    nom_liste_8 varchar(30),
    prenom_liste_8 varchar(30),
    nuance_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,2),
    voix_pourcent_exp_liste_8 numeric(10,2),
    sexe_liste_9 varchar(5),
    nom_liste_9 varchar(30),
    prenom_liste_9 varchar(30),
    nuance_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,2),
    voix_pourcent_exp_liste_9 numeric(10,2),
    sexe_liste_10 varchar(5),
    nom_liste_10 varchar(30),
    prenom_liste_10 varchar(30),
    nuance_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,2),
    voix_pourcent_exp_liste_10 numeric(10,2),
    sexe_liste_11 varchar(5),
    nom_liste_11 varchar(30),
    prenom_liste_11 varchar(30),
    nuance_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,2),
    voix_pourcent_exp_liste_11 numeric(10,2),
    sexe_liste_12 varchar(5),
    nom_liste_12 varchar(30),
    prenom_liste_12 varchar(30),
    nuance_liste_12 varchar(10),
    nb_voix_liste_12 int,
    voix_pourcent_ins_liste_12 numeric(10,2),
    voix_pourcent_exp_liste_12 numeric(10,2),
    sexe_liste_13 varchar(5),
    nom_liste_13 varchar(30),
    prenom_liste_13 varchar(30),
    nuance_liste_13 varchar(10),
    nb_voix_liste_13 int,
    voix_pourcent_ins_liste_13 numeric(10,2),
    voix_pourcent_exp_liste_13 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton)
);

-- Copie des résultats aux élections départementales 2011 tour 1
-- par cantons dans la table t1_2011_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t1_2011_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2011_tour_1.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2011 tour 2 par cantons

CREATE TABLE t2_2011_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton)
);

-- Copie des résultats aux élections départementales 2011 tour 2
-- par cantons dans la table t2_2011_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t2_2011_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2011_tour_2.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2015 tour 1 par cantons

CREATE TABLE t1_2015_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs int,
    blancs_pourcent_ins numeric(10,2),
    blancs_pourcent_vot numeric(10,2),
    nb_nuls int,
    nuls_pourcent_ins numeric(10,2),
    nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    num_panneau_liste_1 int,
    nuance_liste_1 varchar(20),
    binome_liste_1 varchar(150),
    sieges_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    num_panneau_liste_2 int,
    nuance_liste_2 varchar(20),
    binome_liste_2 varchar(150),
    sieges_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    num_panneau_liste_3 int,
    nuance_liste_3 varchar(20),
    binome_liste_3 varchar(150),
    sieges_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    num_panneau_liste_4 int,
    nuance_liste_4 varchar(20),
    binome_liste_4 varchar(150),
    sieges_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    num_panneau_liste_5 int,
    nuance_liste_5 varchar(20),
    binome_liste_5 varchar(150),
    sieges_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,2),
    voix_pourcent_exp_liste_5 numeric(10,2),
    num_panneau_liste_6 int,
    nuance_liste_6 varchar(20),
    binome_liste_6 varchar(150),
    sieges_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,2),
    voix_pourcent_exp_liste_6 numeric(10,2),
    num_panneau_liste_7 int,
    nuance_liste_7 varchar(20),
    binome_liste_7 varchar(150),
    sieges_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,2),
    voix_pourcent_exp_liste_7 numeric(10,2),
    num_panneau_liste_8 int,
    nuance_liste_8 varchar(20),
    binome_liste_8 varchar(150),
    sieges_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,2),
    voix_pourcent_exp_liste_8 numeric(10,2),
    num_panneau_liste_9 int,
    nuance_liste_9 varchar(20),
    binome_liste_9 varchar(150),
    sieges_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,2),
    voix_pourcent_exp_liste_9 numeric(10,2),
    num_panneau_liste_10 int,
    nuance_liste_10 varchar(20),
    binome_liste_10 varchar(150),
    sieges_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,2),
    voix_pourcent_exp_liste_10 numeric(10,2),
    num_panneau_liste_11 int,
    nuance_liste_11 varchar(20),
    binome_liste_11 varchar(150),
    sieges_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,2),
    voix_pourcent_exp_liste_11 numeric(10,2),
    num_panneau_liste_12 int,
    nuance_liste_12 varchar(20),
    binome_liste_12 varchar(150),
    sieges_liste_12 varchar(10),
    nb_voix_liste_12 int,
    voix_pourcent_ins_liste_12 numeric(10,2),
    voix_pourcent_exp_liste_12 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton)
);

-- Copie des résultats aux élections départementales 2015 tour 1
-- par cantons dans la table t1_2015_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t1_2015_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2015_tour_1.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2015 tour 2 par cantons

CREATE TABLE t2_2015_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs int,
    blancs_pourcent_ins numeric(10,2),
    blancs_pourcent_vot numeric(10,2),
    nb_nuls int,
    nuls_pourcent_ins numeric(10,2),
    nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    num_panneau_liste_1 int,
    nuance_liste_1 varchar(20),
    binome_liste_1 varchar(150),
    sieges_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    num_panneau_liste_2 int,
    nuance_liste_2 varchar(20),
    binome_liste_2 varchar(150),
    sieges_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    num_panneau_liste_3 int,
    nuance_liste_3 varchar(20),
    binome_liste_3 varchar(150),
    sieges_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton)
);

-- Copie des résultats aux élections départementales 2015 tour 2
-- par cantons dans la table t2_2015_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t2_2015_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2015_tour_2.csv' 
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2011 tour 1 par communes

CREATE TABLE t1_2011_communes
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    code_commune int,
    nom_commune varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    sexe_liste_5 varchar(5),
    nom_liste_5 varchar(30),
    prenom_liste_5 varchar(30),
    nuance_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,2),
    voix_pourcent_exp_liste_5 numeric(10,2),
    sexe_liste_6 varchar(5),
    nom_liste_6 varchar(30),
    prenom_liste_6 varchar(30),
    nuance_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,2),
    voix_pourcent_exp_liste_6 numeric(10,2),
    sexe_liste_7 varchar(5),
    nom_liste_7 varchar(30),
    prenom_liste_7 varchar(30),
    nuance_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,2),
    voix_pourcent_exp_liste_7 numeric(10,2),
    sexe_liste_8 varchar(5),
    nom_liste_8 varchar(30),
    prenom_liste_8 varchar(30),
    nuance_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,2),
    voix_pourcent_exp_liste_8 numeric(10,2),
    sexe_liste_9 varchar(5),
    nom_liste_9 varchar(30),
    prenom_liste_9 varchar(30),
    nuance_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,2),
    voix_pourcent_exp_liste_9 numeric(10,2),
    sexe_liste_10 varchar(5),
    nom_liste_10 varchar(30),
    prenom_liste_10 varchar(30),
    nuance_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,2),
    voix_pourcent_exp_liste_10 numeric(10,2),
    sexe_liste_11 varchar(5),
    nom_liste_11 varchar(30),
    prenom_liste_11 varchar(30),
    nuance_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,2),
    voix_pourcent_exp_liste_11 numeric(10,2),
    sexe_liste_12 varchar(5),
    nom_liste_12 varchar(30),
    prenom_liste_12 varchar(30),
    nuance_liste_12 varchar(10),
    nb_voix_liste_12 int,
    voix_pourcent_ins_liste_12 numeric(10,2),
    voix_pourcent_exp_liste_12 numeric(10,2),
    sexe_liste_13 varchar(5),
    nom_liste_13 varchar(30),
    prenom_liste_13 varchar(30),
    nuance_liste_13 varchar(10),
    nb_voix_liste_13 int,
    voix_pourcent_ins_liste_13 numeric(10,2),
    voix_pourcent_exp_liste_13 numeric(10,2),
    sexe_liste_14 varchar(5),
    nom_liste_14 varchar(30),
    prenom_liste_14 varchar(30),
    nuance_liste_14 varchar(10),
    nb_voix_liste_14 int,
    voix_pourcent_ins_liste_14 numeric(10,2),
    voix_pourcent_exp_liste_14 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2011 tour 1
-- par communes dans la table t1_2011_communes depuis le fichier 
-- .csv qui contient les données

COPY public.t1_2011_communes
FROM '/home/pi/Documents/elections/dataset/Departementales_communes_2011_tour_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2011 tour 2 par communes

CREATE TABLE t2_2011_communes
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    code_commune int,
    nom_commune varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2011 tour 2
-- par communes dans la table t2_2011_communes depuis le fichier 
-- .csv qui contient les données

COPY public.t2_2011_communes
FROM '/home/pi/Documents/elections/dataset/Departementales_communes_2011_tour_2.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2008 tour 1 par communes

CREATE TABLE t1_2008_communes
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    code_commune int,
    nom_commune varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    sexe_liste_5 varchar(5),
    nom_liste_5 varchar(30),
    prenom_liste_5 varchar(30),
    nuance_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,2),
    voix_pourcent_exp_liste_5 numeric(10,2),
    sexe_liste_6 varchar(5),
    nom_liste_6 varchar(30),
    prenom_liste_6 varchar(30),
    nuance_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,2),
    voix_pourcent_exp_liste_6 numeric(10,2),
    sexe_liste_7 varchar(5),
    nom_liste_7 varchar(30),
    prenom_liste_7 varchar(30),
    nuance_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,2),
    voix_pourcent_exp_liste_7 numeric(10,2),
    sexe_liste_8 varchar(5),
    nom_liste_8 varchar(30),
    prenom_liste_8 varchar(30),
    nuance_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,2),
    voix_pourcent_exp_liste_8 numeric(10,2),
    sexe_liste_9 varchar(5),
    nom_liste_9 varchar(30),
    prenom_liste_9 varchar(30),
    nuance_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,2),
    voix_pourcent_exp_liste_9 numeric(10,2),
    sexe_liste_10 varchar(5),
    nom_liste_10 varchar(30),
    prenom_liste_10 varchar(30),
    nuance_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,2),
    voix_pourcent_exp_liste_10 numeric(10,2),
    sexe_liste_11 varchar(5),
    nom_liste_11 varchar(30),
    prenom_liste_11 varchar(30),
    nuance_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,2),
    voix_pourcent_exp_liste_11 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2008 tour 1
-- par communes dans la table t1_2008_communes depuis le fichier
-- .csv qui contient les données

COPY public.t1_2008_communes
FROM '/home/pi/Documents/elections/dataset/Departementales_communes_2008_tour_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2008 tour 2 par communes

CREATE TABLE t2_2008_communes
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    code_commune int,
    nom_commune varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    blancs_nuls_pourcent_vot numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2008 tour 2
-- par communes dans la table t2_2008_communes depuis le fichier
-- .csv qui contient les données

COPY public.t2_2008_communes
FROM '/home/pi/Documents/elections/dataset/Departementales_communes_2008_tour_2.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2015 tours 1 et 2 
-- par bureau de vote

CREATE TABLE t1_t2_2015_bvotes
(
    num_tour int,
    num_departement varchar(3),
    code_commune int,
    nom_commune varchar(50),
    code_bureau varchar(10),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_votes int,
    nb_exprimés int,
    num_candidat int,
    candidat varchar(75),
    nuance varchar(10),
    nb_voix int,
    PRIMARY KEY (num_tour, num_departement, code_canton, code_commune, code_bureau, num_candidat)
);

-- Copie des résultats aux élections départementales 2015 tours 1
-- et 2 par bureau de vote dans la table t1_t2_2015_bvotes depuis 
-- le fichier .csv qui contient les données

COPY public.t1_t2_2015_bvotes
FROM '/home/pi/Documents/elections/dataset/Departementales_bvote_2015_tour_1_2.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2021 tour 1 par canton
-- dans le département du cher

CREATE TABLE t1_2021_cantons_cher
(
    code_canton int PRIMARY KEY,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_blancs int,
    blancs_pourcent_ins numeric(10,2),
    nb_nuls int,
    nuls_pourcents_ins numeric(10,2),
    nuance_liste_1 varchar(10),
    binome_liste_1 varchar(75),
    nb_voix_liste_1 int,
    voix_pourcent_exp_liste_1 numeric(10,2),
    nuance_liste_2 varchar(10),
    binome_liste_2 varchar(75),
    nb_voix_liste_2 int,
    voix_pourcent_exp_liste_2 numeric(10,2),
    nuance_liste_3 varchar(10),
    binome_liste_3 varchar(75),
    nb_voix_liste_3 int,
    voix_pourcent_exp_liste_3 numeric(10,2),
    nuance_liste_4 varchar(10),
    binome_liste_4 varchar(75),
    nb_voix_liste_4 int,
    voix_pourcent_exp_liste_4 numeric(10,2),
    nuance_liste_5 varchar(10),
    binome_liste_5 varchar(75),
    nb_voix_liste_5 int,
    voix_pourcent_exp_liste_5 numeric(10,2)
);

COPY public.t1_2021_cantons_cher
FROM '/home/pi/Documents/elections/dataset/Departementales_canton_cher_2021_tour_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2008 tour 1 par cantons

CREATE TABLE t1_2008_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    sexe_liste_5 varchar(5),
    nom_liste_5 varchar(30),
    prenom_liste_5 varchar(30),
    nuance_liste_5 varchar(10),
    nb_voix_liste_5 int,
    voix_pourcent_ins_liste_5 numeric(10,2),
    voix_pourcent_exp_liste_5 numeric(10,2),
    sexe_liste_6 varchar(5),
    nom_liste_6 varchar(30),
    prenom_liste_6 varchar(30),
    nuance_liste_6 varchar(10),
    nb_voix_liste_6 int,
    voix_pourcent_ins_liste_6 numeric(10,2),
    voix_pourcent_exp_liste_6 numeric(10,2),
    sexe_liste_7 varchar(5),
    nom_liste_7 varchar(30),
    prenom_liste_7 varchar(30),
    nuance_liste_7 varchar(10),
    nb_voix_liste_7 int,
    voix_pourcent_ins_liste_7 numeric(10,2),
    voix_pourcent_exp_liste_7 numeric(10,2),
    sexe_liste_8 varchar(5),
    nom_liste_8 varchar(30),
    prenom_liste_8 varchar(30),
    nuance_liste_8 varchar(10),
    nb_voix_liste_8 int,
    voix_pourcent_ins_liste_8 numeric(10,2),
    voix_pourcent_exp_liste_8 numeric(10,2),
    sexe_liste_9 varchar(5),
    nom_liste_9 varchar(30),
    prenom_liste_9 varchar(30),
    nuance_liste_9 varchar(10),
    nb_voix_liste_9 int,
    voix_pourcent_ins_liste_9 numeric(10,2),
    voix_pourcent_exp_liste_9 numeric(10,2),
    sexe_liste_10 varchar(5),
    nom_liste_10 varchar(30),
    prenom_liste_10 varchar(30),
    nuance_liste_10 varchar(10),
    nb_voix_liste_10 int,
    voix_pourcent_ins_liste_10 numeric(10,2),
    voix_pourcent_exp_liste_10 numeric(10,2),
    sexe_liste_11 varchar(5),
    nom_liste_11 varchar(30),
    prenom_liste_11 varchar(30),
    nuance_liste_11 varchar(10),
    nb_voix_liste_11 int,
    voix_pourcent_ins_liste_11 numeric(10,2),
    voix_pourcent_exp_liste_11 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2008 tour 1
-- par cantons dans la table t1_2008_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t1_2008_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2008_tour_1.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');

-- Table des résultats aux élections départementales 2008 tour 2 par cantons

CREATE TABLE t2_2008_cantons
(
    num_departement varchar(3),
    nom_departement varchar(35),
    code_canton int,
    nom_canton varchar(50),
    nb_inscrits int,
    nb_abstentions int,
    abs_pourcent_ins numeric(10,2),
    nb_votants int,
    vot_pourcent_ins numeric(10,2),
    nb_blancs_nuls int,
    blancs_nuls_pourcent_ins numeric(10,2),
    nb_exprimés int,
    exp_pourcent_ins numeric(10,2),
    exp_pourcent_vot numeric(10,2),
    sexe_liste_1 varchar(5),
    nom_liste_1 varchar(30),
    prenom_liste_1 varchar(30),
    nuance_liste_1 varchar(10),
    nb_voix_liste_1 int,
    voix_pourcent_ins_liste_1 numeric(10,2),
    voix_pourcent_exp_liste_1 numeric(10,2),
    sexe_liste_2 varchar(5),
    nom_liste_2 varchar(30),
    prenom_liste_2 varchar(30),
    nuance_liste_2 varchar(10),
    nb_voix_liste_2 int,
    voix_pourcent_ins_liste_2 numeric(10,2),
    voix_pourcent_exp_liste_2 numeric(10,2),
    sexe_liste_3 varchar(5),
    nom_liste_3 varchar(30),
    prenom_liste_3 varchar(30),
    nuance_liste_3 varchar(10),
    nb_voix_liste_3 int,
    voix_pourcent_ins_liste_3 numeric(10,2),
    voix_pourcent_exp_liste_3 numeric(10,2),
    sexe_liste_4 varchar(5),
    nom_liste_4 varchar(30),
    prenom_liste_4 varchar(30),
    nuance_liste_4 varchar(10),
    nb_voix_liste_4 int,
    voix_pourcent_ins_liste_4 numeric(10,2),
    voix_pourcent_exp_liste_4 numeric(10,2),
    PRIMARY KEY (num_departement, code_canton, code_commune)
);

-- Copie des résultats aux élections départementales 2008 tour 2
-- par cantons dans la table t2_2008_cantons depuis le fichier 
-- .csv qui contient les données

COPY public.t2_2008_cantons
FROM '/home/pi/Documents/elections/dataset/Departementales_cantons_2008_tour_2.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ';');