<?php

    function affiche_tour_1_departement($annee, $num_departement) {

        $result = array();

        // Connexion, sélection de la base de données
        $dbconn = pg_connect("host=localhost dbname=electionsdb user=pi password=estilections")
        or die('Connexion impossible : ' . pg_last_error());
        switch ($annee) {

            case 2008:

                // Exécution de la requête SQL sécurisée
                $query = "SELECT code_canton, nom_canton, nuance_liste_1, voix_pourcent_ins_liste_1, nuance_liste_2, voix_pourcent_ins_liste_2, nuance_liste_3, voix_pourcent_ins_liste_3, nuance_liste_4, voix_pourcent_ins_liste_4, nuance_liste_5, voix_pourcent_ins_liste_5, nuance_liste_6, voix_pourcent_ins_liste_6, nuance_liste_7, voix_pourcent_ins_liste_7, nuance_liste_8, voix_pourcent_ins_liste_8, nuance_liste_9, voix_pourcent_ins_liste_9, nuance_liste_10, voix_pourcent_ins_liste_10, nuance_liste_11, voix_pourcent_ins_liste_11, nuance_liste_12, voix_pourcent_ins_liste_12 FROM public.t1_2008_cantons WHERE num_departement=$1;";
                break;

            case 2011:

                // Exécution de la requête SQL sécurisée
                $query = "SELECT code_canton, nom_canton, nuance_liste_1, voix_pourcent_ins_liste_1, nuance_liste_2, voix_pourcent_ins_liste_2, nuance_liste_3, voix_pourcent_ins_liste_3, nuance_liste_4, voix_pourcent_ins_liste_4, nuance_liste_5, voix_pourcent_ins_liste_5, nuance_liste_6, voix_pourcent_ins_liste_6, nuance_liste_7, voix_pourcent_ins_liste_7, nuance_liste_8, voix_pourcent_ins_liste_8, nuance_liste_9, voix_pourcent_ins_liste_9, nuance_liste_10, voix_pourcent_ins_liste_10, nuance_liste_11, voix_pourcent_ins_liste_11, nuance_liste_12, voix_pourcent_ins_liste_12 FROM public.t1_2011_cantons WHERE num_departement=$1;";
                break;

            case 2015:

                // Exécution de la requête SQL sécurisée
                $query = "SELECT code_canton, nom_canton, nuance_liste_1, voix_pourcent_ins_liste_1, nuance_liste_2, voix_pourcent_ins_liste_2, nuance_liste_3, voix_pourcent_ins_liste_3, nuance_liste_4, voix_pourcent_ins_liste_4, nuance_liste_5, voix_pourcent_ins_liste_5, nuance_liste_6, voix_pourcent_ins_liste_6, nuance_liste_7, voix_pourcent_ins_liste_7, nuance_liste_8, voix_pourcent_ins_liste_8, nuance_liste_9, voix_pourcent_ins_liste_9, nuance_liste_10, voix_pourcent_ins_liste_10, nuance_liste_11, voix_pourcent_ins_liste_11, nuance_liste_12, voix_pourcent_ins_liste_12 FROM public.t1_2015_cantons WHERE num_departement=$1;";
                break;

            case 2021:

                // Exécution de la requête SQL sécurisée
                $query = "SELECT code_canton, nom_canton, nuance_liste_1, voix_pourcent_ins_liste_1, nuance_liste_2, voix_pourcent_ins_liste_2, nuance_liste_3, voix_pourcent_ins_liste_3, nuance_liste_4, voix_pourcent_ins_liste_4, nuance_liste_5, voix_pourcent_ins_liste_5, nuance_liste_6, voix_pourcent_ins_liste_6, nuance_liste_7, voix_pourcent_ins_liste_7, nuance_liste_8, voix_pourcent_ins_liste_8, nuance_liste_9, voix_pourcent_ins_liste_9, nuance_liste_10, voix_pourcent_ins_liste_10, nuance_liste_11, voix_pourcent_ins_liste_11, nuance_liste_12, voix_pourcent_ins_liste_12 FROM public.t1_2021_cantons WHERE num_departement=$1;";
                break;

            default:
                
                //Si l'année n'est pas valide
                $result['error'] = "Pas d'information pour l'année ".$annee;
                return $result;
            
        }
        $res = pg_query_params($dbconn, $query, array($num_departement)) or die('Échec de la requête : ' . pg_last_error());

        // Ferme la connexion
        pg_close($dbconn);

        while ($row = pg_fetch_row($res)) {
            $result[] = $row;
        }

        //On retourne la requête
        return $result;
    }
    

    header('Content-Type: application/json');

    $resultat_requete = array();
 
    if ( !isset($_POST['functionname']) ) {
        $resultat_requete['error'] = "Pas de nom de fonction !";
    }
    if ( !isset($_POST['arguments']) ) {
        $resultat_requete['error'] = "Pas d'aguments de fonction !"; 
    }
    if ( !isset($resultat_requete['error']) ) {
        switch ( $_POST['functionname'] ) {
            case 'affiche_tour_1_departement':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2) ) {
                    $resultat_requete['error'] = "Erreur d'argument !";
                }
                else {
                    $resultat_requete['result'] = affiche_tour_1_departement( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;
            
            case 'affiche_tour_2_departement':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2 ) ) {
                    $resultat_requete['error'] = "Erreur d'arguments !";
                }
                else {
                    $resultat_requete['result'] = affiche_tour_2_departement( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;

            case 'affiche_tour_1_region':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2) ) {
                    $resultat_requete['error'] = "Erreur d'argument !";
                }
                else {
                    $resultat_requete['result'] = affiche_tour_1_region( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;
            
            case 'affiche_tour_2_region':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2 ) ) {
                    $resultat_requete['error'] = "Erreur d'arguments !";
                }
                else {
                    $resultat_requete['result'] = affiche_tour_2_region( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;

            case 'estimation_tour_2_departement':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2 ) ) {
                    $resultat_requete['error'] = "Erreur d'arguments !";
                }
                else {
                    $resultat_requete['result'] = estimation_tour_2_departement( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;

            case 'estimation_tour_2_region':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) != 2 ) ) {
                    $resultat_requete['error'] = "Erreur d'arguments !";
                }
                else {
                    $resultat_requete['result'] = estimation_tour_2_region( intval($_POST['arguments'][0]), strval($_POST['arguments'][1]) );
                }
                break;

            default:
                $resultat_requete['error'] = "La fonction ".$_POST['functionname']." n'a pas été trouvée";
                break;
        }
    }

    echo json_encode($resultat_requete);

?>