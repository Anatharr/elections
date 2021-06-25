<?php

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
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) <> 2) )
        }
    }

?>