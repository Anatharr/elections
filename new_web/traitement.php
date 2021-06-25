<?php

    function affiche_tour_1_departement($annee, $num_departement) {

        // Connexion, sélection de la base de données
        $dbconn = pg_connect("host=localhost dbname=electionsdb user=pi password=estilections")
        or die('Connexion impossible : ' . pg_last_error());
         
        // Exécution de la requête SQL
        $query = "SELECT code_canton, nom_canton, nuance_liste_1, voix_pourcent_ins_liste_1, nuance_liste_2, voix_pourcent_ins_liste_2, nuance_liste_3, voix_pourcent_ins_liste_3, nuance_liste_4, voix_pourcent_ins_liste_4, nuance_liste_5, voix_pourcent_ins_liste_5, nuance_liste_6, voix_pourcent_ins_liste_6, nuance_liste_7, voix_pourcent_ins_liste_7, nuance_liste_8, voix_pourcent_ins_liste_8, nuance_liste_9, voix_pourcent_ins_liste_9, nuance_liste_10, voix_pourcent_ins_liste_10, nuance_liste_11, voix_pourcent_ins_liste_11, nuance_liste_12, voix_pourcent_ins_liste_12 FROM public.t1_$1_cantons WHERE num_departement=$2;";
        $result = pg_query_params($dbconn, $query, array($annee, $num_departement)) or die('Échec de la requête : ' . pg_last_error());

        // Ferme la connexion
        pg_close($dbconn);

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
        }
    }

    echo json_encode($resultat_requete);

?>