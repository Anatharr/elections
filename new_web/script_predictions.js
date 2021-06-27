/* DECLARATIONS VARIABLES */
let img_dep = document.getElementById("img_dep");
let img_reg = document.getElementById("img_reg");

let deroulant_dep = document.getElementById("deroulant_dep");
let label_deroulant_dep = document.getElementById("label_deroulant_dep");
let deroulant_reg = document.getElementById("deroulant_reg");
let label_deroulant_reg = document.getElementById("label_deroulant_reg");

let section_departement = document.getElementById("section_departement");
let section_region = document.getElementById("section_region");
let section_france = document.getElementById("section_france");

var bool_deroulant_bloquant;

var resultat_php;
var resultat_php_tab;



/* RESET DES DIFFERENTS AFFICHAGES */

document.getElementById("section_departement").style.display = "none";
section_region.style.display = "none";
section_france.style.display = "none";


/* AFFICHAGE DES MENUS DEROULANTS */

function afficherDeroulantDep() {
    if (!bool_deroulant_bloquant) {
        let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
        if (getComputedStyle(section_departement).display != "none") {
            section_departement.style.display = "none"
        } else {
            section_departement.style.display = "block"
            section_region.style.display = "none"
            section_france.style.display = "none"
            document.getElementById("graph_dep").textContent = "Graphe élections départementales"
            document.getElementById("dep_choix").value = "Default"
            document.getElementById("dep_annee_choix").value = "Default"

        }
    }

}

function afficherDeroulantReg() {
    if (!bool_deroulant_bloquant) {
        let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
        if (getComputedStyle(section_region).display != "none") {
            section_region.style.display = "none"
        } else {
            section_region.style.display = "block"
            section_departement.style.display = "none"
            section_france.style.display = "none"
            document.getElementById("graph_reg").textContent = "Graphe élections régionales"
            document.getElementById("reg_choix").value = "Default"
            document.getElementById("reg_annee_choix").value = "Default"
        }
    }
}

function afficherDeroulantFr() {
    if (!bool_deroulant_bloquant) {
        let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
        window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
        section_departement.style.display = "none"
        section_region.style.display = "none"
        section_france.style.display = "block"
    }
}


/* RECUPERATION DE LA VALEUR CHOISIE DANS LES MENUS DEROULANTS */

function recuperer_departement_annee() {
    deroulant_dep_annee = document.getElementById("dep_annee_choix");
    annee_dep = deroulant_dep_annee.options[deroulant_dep_annee.selectedIndex].text;

    /* ICI - VALUE ANNE DU DEPARTEMENT */
    console.log(document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value);
}

function recuperer_region_annee() {
    deroulant_reg_annee = document.getElementById("reg_annee_choix");
    annee_reg = deroulant_reg_annee.options[deroulant_reg_annee.selectedIndex].text;

    /* ICI - VALUE ANNE DE LA REGION */
    console.log(document.getElementById("reg_annee_choix").options[deroulant_reg_annee.selectedIndex].value);
}

function recuperer_departement() {
    document.getElementById("graph_dep").innerHTML = "Graphe élections départementales pour : ";
    deroulant_dep = document.getElementById("dep_choix");
    texte = deroulant_dep.options[deroulant_dep.selectedIndex].text;
    document.getElementById("graph_dep").innerHTML = document.getElementById("graph_dep").textContent + texte + " en " + annee_dep;

    /* ICI - VALUE DU DEPARTEMENT */
    console.log(document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value);
}

function recuperer_region() {
    document.getElementById("graph_reg").textContent = "Graphe élections régionales pour : ";
    deroulant_reg = document.getElementById("reg_choix");
    texte = deroulant_reg.options[deroulant_reg.selectedIndex].text;
    document.getElementById("graph_reg").textContent = document.getElementById("graph_reg").textContent + texte + " en " + annee_reg;

    /* ICI - VALUE DE LA REGION */
    console.log(document.getElementById("reg_choix").options[deroulant_reg.selectedIndex].value);
}


/* MENU DEROULANT BLOQUANT */

function menu_deroulant_bloquant() {
    let checkbox = document.getElementById("checkbox_burger");
    let body = document.getElementById("body_id");
    if (checkbox.checked) {
        body.style.overflowY = "hidden";
        bool_deroulant_bloquant = true;
    } else {
        body.style.overflowY = "visible";
        bool_deroulant_bloquant = false;
    }
}



/* RECHERCHE ET CONSTRUCTION GRAPH */

function rechercher_données_tour_1() {
    let scrollDiv = document.getElementById("graph_dep").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
    var requestURL = 'http://176.135.226.148:180/predictions.php';

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    // tableau du 1er tour (données à analyser)

    jQuery.ajax({
        type: "POST",
        url: 'traitement.php',
        dataType: 'json',
        data: { functionname: 'affiche_tour_1_departement', arguments: [document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value, document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value] },

        success: function(obj, textstatus) {
            if (!('error' in obj)) {
                resultat_php = obj.result;
            } else {
                console.log(obj.error);
            }

            /* Affiche le graphe */
            //let data = affichageGrapheDept(resultat_php);
            //configGrapheDeptT1(data);

            let chaine = "<table id='tour1_tab_dep'>";
            chaine += "<caption id='tour1_titre'>Détails des résultats aux élections départementales au premier tour</caption>";
            chaine += "<tr>";
            chaine += "<th class='tour1_colonne_dep'>Code canton</th>";
            chaine += "<th class='tour1_colonne_dep'>Nom canton</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
            switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {
                case "2008":
                    break;

                case "2011":
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    break;

                case "2015":
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    break;

                case "2021":
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/exprimés</th>";
                    break;

                default:
                    console.log("Année invalide");
                    break;
            }
            chaine += "</tr>";
            let j;
            resultat_php_tab = new Array(resultat_php.length);
            for (i = 0; i < resultat_php.length; i++) {
                resultat_php_tab[i] = [];
                j = 0;
                chaine += "<tr>";
                resultat_php[i].forEach(elem => {
                    chaine += "<td class='tour1_colonne_dep'>";
                    if (elem == null) {
                        chaine += "";
                    } else { chaine += elem; }
                    chaine += "</td>";
                    resultat_php_tab[i][j] = elem;
                    j++;
                })
                chaine += "</tr>";
            }
            chaine += "</table>";
            document.getElementById("tour_1").innerHTML = chaine;
            console.table(resultat_php_tab);

        },

        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }


    })

}

function rechercher_données_tour_2() {

    jQuery.ajax({
        type: "POST",
        url: 'traitement.php',
        dataType: 'json',
        data: { functionname: 'affiche_tour_2_departement', arguments: [document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value, document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value] },

        success: function(obj, textstatus) {
            if (!('error' in obj)) {
                resultat_php = obj.result;
            } else {
                console.log(obj.error);
            }

            /* Affiche le graphe */
            //let data = affichageGrapheDept(resultat_php);
            //configGrapheDeptT2(data);

            if (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value != "2021") {

                let chaine = "<table id='tour2_tab_dep'>";
                chaine += "<caption id='tour2_titre'>Détails des résultats aux élections départementales au deuxième tour</caption>";
                chaine += "<tr>";
                chaine += "<th class='tour2_colonne_dep'>Code canton</th>";
                chaine += "<th class='tour2_colonne_dep'>Nom canton</th>";
                chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
                chaine += "<th class='tour2_colonne_dep'>% voix/exprimés</th>";
                chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
                chaine += "<th class='tour2_colonne_dep'>% voix/exprimés</th>";
                chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
                chaine += "<th class='tour2_colonne_dep'>% voix/exprimés</th>";
                switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {
                    case "2008":
                        chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
                        chaine += "<th class='tour2_colonne_dep'>% voix/exprimés</th>";
                        break;

                    case "2011":
                        break;

                    case "2015":
                        break;

                        //case "2021":

                        /* /!\ Modifier en fonction des données de 2021 /!\ */

                        //break;

                    default:
                        console.log("Année invalide");
                        break;
                }
                chaine += "</tr>";
                for (i = 0; i < resultat_php.length; i++) {
                    chaine += "<tr>";
                    resultat_php[i].forEach(elem => {
                        chaine += "<td class='tour2_colonne_dep'>";
                        if (elem == null) {
                            chaine += "";
                        } else { chaine += elem; }
                        chaine += "</td>";
                    })
                    chaine += "</tr>";
                }
                chaine += "</table>";
                document.getElementById("tour_2").innerHTML = chaine;

            }

        },

        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }


    })

}

function lancer_recherche_dep() {
    let scrollDiv = document.getElementById("graph_dep").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
    var requestURL = 'http://176.135.226.148:180/predictions.php';

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    // on interroge la base de données pour obtenir les données de l'élection et du tour 1 
    rechercher_données_tour_1();

    // on interroge la base de données pour obtenir les données de l'élection et du tour 2
    rechercher_données_tour_2();
}



function lancer_recherche_reg() {
    let scrollDiv = document.getElementById("graph_reg").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
}

function affichageGrapheDept(resultat_php) {

    /* Traitement des données du résultat de la requete et préparation des données pour l'affichage du graphe, création d'un dictionnaire regroupant les cantons et les scores par partis */
    var obj_dept = new Object();
    obj_dept.name = document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].text;
    obj_dept.cantons = new Array(nombre_canton);

    var nombre_canton = resultat_php.length;
    var nombre_nuances = 0;
    var tab_nuances_graphe = [];



    /**** Plusieurs cas, les noms des nuances et leur nombre différent selon l'année ****/
    switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {

        /************* 2008  ***********/
        case "2008":
            nombre_nuances = 15;

            /* Tableau regroupant les nuances et leur couleur respective */
            var tab_nuances_08 = [
                { nom_nuance: 'EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'COM', backgroundColor: 'rgb(221, 0, 0)' }, { nom_nuance: 'RDG', backgroundColor: 'rgb(255, 209, 220)' }, { nom_nuance: 'VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'DVG', backgroundColor: 'rgb(255, 192, 192)' },
                { nom_nuance: 'ECO', backgroundColor: 'rgb(85, 190, 71)' }, { nom_nuance: 'SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'UDFD', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'M-NC', backgroundColor: 'rgb(0, 255, 255)' }, { nom_nuance: 'AUT', backgroundColor: 'rgb(134, 143, 152)' },
                { nom_nuance: 'DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'UMP', backgroundColor: 'rgb(0, 102, 204)' }, { nom_nuance: 'FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'EXD', backgroundColor: 'rgb(64, 64, 64)' }, { nom_nuance: 'REG', backgroundColor: 'rgb(220, 191, 163)' }
            ];

            /* Ajout des datasets */
            tab_nuances_graphe = tab_nuances_08;

            break;

            /************* 2011  ***********/
        case "2011":
            nombre_nuances = 17;
            var tab_nuances_11 = [
                { nom_nuance: 'EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'COM', backgroundColor: 'rgb(221, 0, 0)' }, { nom_nuance: 'PG', backgroundColor: 'rgb(251, 101, 129)' }, { nom_nuance: 'RDG', backgroundColor: 'rgb(255, 209, 220)' },
                { nom_nuance: 'VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'DVG', backgroundColor: 'rgb(255, 192, 192)' }, { nom_nuance: 'ECO', backgroundColor: 'rgb(85, 190, 71)' },
                { nom_nuance: 'SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'MODM', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'M-NC', backgroundColor: 'rgb(0, 255, 255)' }, { nom_nuance: 'M', backgroundColor: 'rgb(135, 206, 250)' },
                { nom_nuance: 'AUT', backgroundColor: 'rgb(134, 143, 152)' }, { nom_nuance: 'DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'UMP', backgroundColor: 'rgb(0, 102, 204)' },
                { nom_nuance: 'FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'EXD', backgroundColor: 'rgb(64, 64, 64)' }, { nom_nuance: 'REG', backgroundColor: 'rgb(220, 191, 163)' }
            ];

            tab_nuances_graphe = tab_nuances_11;

            break;

            /************* 2015  ***********/
        case "2015":
            nombre_nuances = 19;
            var tab_nuances_15 = [
                { nom_nuance: 'BC-EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'BC-FG', backgroundColor: 'rgb(161, 40, 48)' }, { nom_nuance: 'BC-COM', backgroundColor: 'rgb(221, 0, 0)' },
                { nom_nuance: 'BC-PG', backgroundColor: 'rgb(251, 101, 129)' }, { nom_nuance: 'BC-RDG', backgroundColor: 'rgb(255, 209, 220)' },
                { nom_nuance: 'BC-UG', backgroundColor: 'rgb(204, 102, 102)' }, { nom_nuance: 'BC-VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'BC-DVG', backgroundColor: 'rgb(255, 192, 192)' },
                { nom_nuance: 'BC-SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'BC-MDM', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'BC-UC', backgroundColor: 'rgb(255, 235, 0)' },
                { nom_nuance: 'BC-DIV', backgroundColor: 'rgb(134, 143, 152)' }, { nom_nuance: 'BC-UD', backgroundColor: 'rgb(135, 206, 250)' }, { nom_nuance: 'BC-UDI', backgroundColor: 'rgb(0, 255, 255)' },
                { nom_nuance: 'BC-DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'BC-UMP', backgroundColor: 'rgb(0, 102, 204)' },
                { nom_nuance: 'BC-DLF', backgroundColor: 'rgb(0, 130, 196)' }, { nom_nuance: 'BC-FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'BC-EXD', backgroundColor: 'rgb(64, 64, 64)' }
            ];

            tab_nuances_graphe = tab_nuances_15;

            break;

            /************* 2021  ***********/
        case "2021":
            nombre_nuances = 26;
            break;

        default:
            break;
    }


    /************** Création des datasets à retourner  **************/

    /* Création d'un tableau pour chaque canton dans l'objet et ajout du nom des cantons*/
    for (k = 0; k < nombre_canton; k++) {
        obj_dept.cantons[k] = { name: resultat_php[k][1], parti: new Array(nombre_nuances) };
    }

    /* Initialisation des noms et des scores par nuance dans l'objet */
    for (i = 0; i < nombre_canton; i++) {
        for (j = 0; j < nombre_nuances; j++) {
            obj_dept.cantons[i].parti[j] = { name: tab_nuances_graphe[j].nom_nuance, score: 0 };
        }

        /* Ajout des scores par parti dans l'objet en parcourant le resultat de la requete */
        for (j = 3; j < resultat_php[i].length; j += 2) {
            if (resultat_php[i][j] != null) {
                for (k = 0; k < nombre_nuances; k++) {
                    if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                        obj_dept.cantons[i].parti[k].score += Number(resultat_php[i][j]);
                        break;
                    }
                }

            }
        }
    }
    /*Création et instanciation du tableau des scores à 2 dimensions par parti */
    var tab = new Array(nombre_nuances);
    for (i = 0; i < nombre_nuances; i++) {
        tab[i] = new Array(nombre_canton);
    }
    for (j = 0; j < nombre_nuances; j++) {
        for (i = 0; i < nombre_canton; i++) {
            tab[j][i] = obj_dept.cantons[i].parti[j].score;
        }
    }

    const labels = [];
    for (let i = 0; i < nombre_canton; i++) {
        labels[i] = resultat_php[i][1];
    }
    var datasets_année = new Array(nombre_nuances);
    for (let i = 0; i < nombre_nuances; i++) {
        datasets_année[i] = { label: 'undefined', data: null, backgroundColor: 'undefined' };
    }
    for (let i = 0; i < nombre_nuances; i++) {

        datasets_année[i].label = tab_nuances_graphe[i].nom_nuance;
        datasets_année[i].data = tab[i];
        datasets_année[i].backgroundColor = tab_nuances_graphe[i].backgroundColor;

    }

    const data = {
        labels: labels,
        datasets: datasets_année,

    };
    return data;
}

function affichageGrapheDeptT2(resultat_php) {
    /* Traitement des données du résultat de la requete et préparation des données pour l'affichage du graphe, création d'un dictionnaire regroupant les cantons et les scores par partis */
    var obj_dept = new Object();
    obj_dept.name = document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].text;
    obj_dept.cantons = new Array(nombre_canton);

    var nombre_canton = resultat_php.length;
    var nombre_nuances = 0;
    var tab_nuances_graphe = {};
    var datasets_année;


    /**** Plusieurs cas, les noms des nuances et leur nombre différent selon l'année ****/
    switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {

        /************* 2008  ***********/
        case "2008":
            nombre_nuances = 15;

            /* Tableau regroupant les nuances et leur couleur respective */
            var tab_nuances_08 = [
                { nom_nuance: 'EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'COM', backgroundColor: 'rgb(221, 0, 0)' }, { nom_nuance: 'RDG', backgroundColor: 'rgb(255, 209, 220)' }, { nom_nuance: 'VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'DVG', backgroundColor: 'rgb(255, 192, 192)' },
                { nom_nuance: 'ECO', backgroundColor: 'rgb(85, 190, 71)' }, { nom_nuance: 'SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'UDFD', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'M-NC', backgroundColor: 'rgb(0, 255, 255)' }, { nom_nuance: 'AUT', backgroundColor: 'rgb(134, 143, 152)' },
                { nom_nuance: 'DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'UMP', backgroundColor: 'rgb(0, 102, 204)' }, { nom_nuance: 'FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'EXD', backgroundColor: 'rgb(64, 64, 64)' }, { nom_nuance: 'REG', backgroundColor: 'rgb(220, 191, 163)' }
            ];

            /* Ajout des datasets */
            tab_nuances_graphe = tab_nuances_08;

            break;

            /************* 2011  ***********/
        case "2011":
            nombre_nuances = 17;
            var tab_nuances_11 = [
                { nom_nuance: 'EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'COM', backgroundColor: 'rgb(221, 0, 0)' }, { nom_nuance: 'PG', backgroundColor: 'rgb(251, 101, 129)' }, { nom_nuance: 'RDG', backgroundColor: 'rgb(255, 209, 220)' },
                { nom_nuance: 'VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'DVG', backgroundColor: 'rgb(255, 192, 192)' }, { nom_nuance: 'ECO', backgroundColor: 'rgb(85, 190, 71)' },
                { nom_nuance: 'SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'MODM', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'M-NC', backgroundColor: 'rgb(0, 255, 255)' }, { nom_nuance: 'M', backgroundColor: 'rgb(135, 206, 250)' },
                { nom_nuance: 'AUT', backgroundColor: 'rgb(134, 143, 152)' }, { nom_nuance: 'DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'UMP', backgroundColor: 'rgb(0, 102, 204)' },
                { nom_nuance: 'FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'EXD', backgroundColor: 'rgb(64, 64, 64)' }, { nom_nuance: 'REG', backgroundColor: 'rgb(220, 191, 163)' }
            ];

            tab_nuances_graphe = tab_nuances_11;

            break;

            /************* 2015  ***********/
        case "2015":
            nombre_nuances = 19;
            var tab_nuances_15 = [
                { nom_nuance: 'BC-EXG', backgroundColor: 'rgb(121, 39, 32)' }, { nom_nuance: 'BC-FG', backgroundColor: 'rgb(161, 40, 48)' }, { nom_nuance: 'BC-COM', backgroundColor: 'rgb(221, 0, 0)' },
                { nom_nuance: 'BC-PG', backgroundColor: 'rgb(251, 101, 129)' }, { nom_nuance: 'BC-RDG', backgroundColor: 'rgb(255, 209, 220)' },
                { nom_nuance: 'BC-UG', backgroundColor: 'rgb(204, 102, 102)' }, { nom_nuance: 'BC-VEC', backgroundColor: 'rgb(49, 112, 35)' }, { nom_nuance: 'BC-DVG', backgroundColor: 'rgb(255, 192, 192)' },
                { nom_nuance: 'BC-SOC', backgroundColor: 'rgb(255, 128, 128)' }, { nom_nuance: 'BC-MDM', backgroundColor: 'rgb(255, 153, 0)' }, { nom_nuance: 'BC-UC', backgroundColor: 'rgb(255, 235, 0)' },
                { nom_nuance: 'BC-DIV', backgroundColor: 'rgb(134, 143, 152)' }, { nom_nuance: 'BC-UD', backgroundColor: 'rgb(135, 206, 250)' }, { nom_nuance: 'BC-UDI', backgroundColor: 'rgb(0, 255, 255)' },
                { nom_nuance: 'BC-DVD', backgroundColor: 'rgb(173, 193, 253)' }, { nom_nuance: 'BC-UMP', backgroundColor: 'rgb(0, 102, 204)' },
                { nom_nuance: 'BC-DLF', backgroundColor: 'rgb(0, 130, 196)' }, { nom_nuance: 'BC-FN', backgroundColor: 'rgb(13, 55, 138)' }, { nom_nuance: 'BC-EXD', backgroundColor: 'rgb(64, 64, 64)' }
            ];

            tab_nuances_graphe = tab_nuances_15;

            break;

            /************* 2021  ***********/
        case "2021":
            nombre_nuances = 26;
            break;

        default:
            break;
    }


    /************** Affichage et configuration du graphe  **************/

    /* Création d'un tableau pour chaque canton dans l'objet et ajout du nom des cantons*/
    for (k = 0; k < nombre_canton; k++) {
        obj_dept.cantons[k] = { name: resultat_php[k][1], parti: new Array(nombre_nuances) };
    }

    /* Initialisation des noms et des scores par nuance dans l'objet */
    for (i = 0; i < nombre_canton; i++) {
        for (j = 0; j < nombre_nuances; j++) {
            obj_dept.cantons[i].parti[j] = { name: tab_nuances_graphe[j].nom_nuance, score: 0 };
        }

        /* Ajout des scores par parti dans l'objet en parcourant le resultat de la requete */
        for (j = 3; j < resultat_php[i].length; j += 2) {
            if (resultat_php[i][j] != null) {
                for (k = 0; k < nombre_nuances; k++) {
                    if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                        obj_dept.cantons[i].parti[k].score += Number(resultat_php[i][j]);
                        break;
                    }
                }

            }
        }
    }
    /*Création et instanciation du tableau des scores à 2 dimensions par parti */
    var tab = new Array(nombre_nuances);
    for (i = 0; i < nombre_nuances; i++) {
        tab[i] = new Array(nombre_canton);
    }
    for (j = 0; j < nombre_nuances; j++) {
        for (i = 0; i < nombre_canton; i++) {
            tab[j][i] = obj_dept.cantons[i].parti[j].score;
        }
    }

    const labels = [];
    for (let i = 0; i < nombre_canton; i++) {
        labels[i] = resultat_php[i][1];
    }
    var datasets_année = new Array(nombre_nuances);
    for (let i = 0; i < nombre_nuances; i++) {
        datasets_année[i] = { label: 'undefined', data: null, backgroundColor: 'undefined' };
    }
    for (let i = 0; i < nombre_nuances; i++) {

        datasets_année[i].label = tab_nuances_graphe[i].nom_nuance;
        datasets_année[i].data = tab[i];
        datasets_année[i].backgroundColor = tab_nuances_graphe[i].backgroundColor;

    }
    const data = {
        labels: labels,
        datasets: datasets_année,

    };
}

function configGrapheDeptT1(data) {
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Résulats élections départementales par cantons - Tour 1'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                }
            }
        }
    };
    document.getElementById("graphe_t1").innerHTML = "<canvas id=\"Graphe_T1\" width=\"1000\" height=\"350\"></canvas>";
    var myChart = new Chart(document.getElementById('Graphe_T1'), config);
}

function configGrapheDeptT2(data) {
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Résulats élections départementales par cantons - Tour 2'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                }
            }
        }
    };

    document.getElementById("graphe_t2").innerHTML = "<canvas id=\"Graphe_T2\" width=\"1000\" height=\"350\"></canvas>";
    var myChart = new Chart(document.getElementById('Graphe_T2'), config);
}