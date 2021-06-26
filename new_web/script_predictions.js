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
            document.getElementById("graph_dep").textContent = "Graph élections départementales"
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
            document.getElementById("graph_reg").textContent = "Graph élections régionales"
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
    document.getElementById("graph_dep").innerHTML = "Graph élections départementales pour : ";
    deroulant_dep = document.getElementById("dep_choix");
    texte = deroulant_dep.options[deroulant_dep.selectedIndex].text;
    document.getElementById("graph_dep").innerHTML = document.getElementById("graph_dep").textContent + texte + " en " + annee_dep;

    /* ICI - VALUE DU DEPARTEMENT */
    console.log(document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value);
}

function recuperer_region() {
    document.getElementById("graph_reg").textContent = "Graph élections régionales pour : ";
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

function lancer_recherche_dep() {
    let scrollDiv = document.getElementById("graph_dep").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
    var requestURL = 'http://176.135.226.148:180/predictions.php';

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    // Tableau du 1er tour (données à analyser)

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
            let chaine = "<h3 id='tour1_titre'>Résultats aux élections départementales au premier tour</h3>";
            chaine += "<table id='tour1_tab_dep'>";
            chaine += "<tr>";
            chaine += "<th class='tour1_colonne_dep'>Code canton</th>";
            chaine += "<th class='tour1_colonne_dep'>Nom canton</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {
                case "2008":
                    break;

                case "2011":
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
                    break;

                case "2015":
                    chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
                    break;

                case "2021":

                    /* /!\ Modifier en fonction des données de 2021 /!\ */

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

            /* Traitement des données du tableau, création d'un dictionnaire regroupant les cantons et les scores par partis */
            affichageGrapheDeptT1(resultat_php);

        },

        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }


    })




    // Tableau du 2ème tour (données réelles)

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
            let chaine = "<h3 id='tour2_titre'>Résultats aux élections départementales au deuxième tour</h3>";
            chaine += "<table id='tour2_tab_dep'>";
            chaine += "<tr>";
            chaine += "<th class='tour2_colonne_dep'>Code canton</th>";
            chaine += "<th class='tour2_colonne_dep'>Nom canton</th>";
            chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour2_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour2_colonne_dep'>% voix/inscrits</th>";
            chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour2_colonne_dep'>% voix/inscrits</th>";
            switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {
                case "2008":
                    chaine += "<th class='tour2_colonne_dep'>Nuance</th>";
                    chaine += "<th class='tour2_colonne_dep'>% voix/inscrits</th>";
                    break;

                case "2011":
                    break;

                case "2015":
                    break;

                case "2021":

                    /* /!\ Modifier en fonction des données de 2021 /!\ */

                    break;

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

            /* Traitement des données du tableau, création d'un dictionnaire regroupant les cantons et les scores par partis */


        },

        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }


    })



}



function lancer_recherche_reg() {
    let scrollDiv = document.getElementById("graph_reg").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
}

function affichageGrapheDeptT1(resultat_php) {
    /* Traitement des données du tableau, création d'un dictionnaire regroupant les cantons et les scores par partis */
    var obj_dept = new Object();

    let tab = new Array(nombre_nuances);
    for (i = 0; i < nombre_nuances; i++) {
        tab[i] = new Array(nombre_canton);
    }

    var nombre_canton = resultat_php.length;
    var nombre_nuances = 0;
    var datasets_année;
    obj_dept.name = document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].text;

    obj_dept.cantons = new Array(nombre_canton);
    switch (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value) {
        case "2008":
            nombre_nuances = 15;
            for (k = 0; k < nombre_canton; k++) {


                obj_dept.cantons[k] = { name: resultat_php[k][1], parti: new Array(nombre_nuances) };

            }

            for (i = 0; i < resultat_php.length; i++) {

                obj_dept.cantons[i].parti[0] = { name: 'BC-EXG', score: 0 };
                obj_dept.cantons[i].parti[1] = { name: 'BC-COM', score: 0 };
                obj_dept.cantons[i].parti[2] = { name: 'BC-RDG', score: 0 };
                obj_dept.cantons[i].parti[3] = { name: 'BC-VEC', score: 0 };
                obj_dept.cantons[i].parti[4] = { name: 'BC-DVG', score: 0 };
                obj_dept.cantons[i].parti[5] = { name: 'BC-ECO', score: 0 };
                obj_dept.cantons[i].parti[6] = { name: 'BC-SOC', score: 0 };
                obj_dept.cantons[i].parti[7] = { name: 'BC-MDM', score: 0 };
                obj_dept.cantons[i].parti[10] = { name: 'BC-NC', score: 0 };
                obj_dept.cantons[i].parti[8] = { name: 'BC-DIV', score: 0 };
                obj_dept.cantons[i].parti[9] = { name: 'BC-DVD', score: 0 };
                obj_dept.cantons[i].parti[11] = { name: 'BC-UMP', score: 0 };
                obj_dept.cantons[i].parti[12] = { name: 'BC-FN', score: 0 };
                obj_dept.cantons[i].parti[13] = { name: 'BC-EXD', score: 0 };
                obj_dept.cantons[i].parti[14] = { name: 'BC-REG', score: 0 };



                for (j = 3; j < resultat_php[i].length; j += 2) {
                    if (resultat_php[i][j] != null) {
                        for (k = 0; k < nombre_nuances; k++) {
                            if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                                obj_dept.cantons[i].parti[k].score += resultat_php[i][j];
                            }
                        }

                    }
                }
            }
         
            for (j = 0; j < nombre_nuances; j++) {
                for (i = 0; i < nombre_canton; i++) {
                    tab[j][i] = obj_dept.cantons[i].parti[j].score;
                }
            }
            datasets_année = [{
                    label: 'BC-EXG',
                    data: tab[0],
                    backgroundColor: 'rgb(187, 0, 0)',
                },
                {
                    label: 'BC-COM',
                    data: tab[1],
                    backgroundColor: 'rgb(221, 0, 0)',
                },
                {
                    label: 'BC-RDG',
                    data: tab[2],
                    backgroundColor: 'rgb(255, 209, 220)',
                },
                {
                    label: 'BC-VEC',
                    data: tab[3],
                    backgroundColor: 'rgb(0, 192, 0)',
                },
                {
                    label: 'BC-DVG',
                    data: tab[4],
                    backgroundColor: 'rgb(255, 192, 192)',
                },
                {
                    label: 'BC-ECO',
                    data: tab[5],
                    backgroundColor: 'rgb(0, 192, 0)',
                },
                {
                    label: 'BC-SOC',
                    data: tab[6],
                    backgroundColor: 'rgb(255, 128, 128)',
                },
                {
                    label: 'BC-MDM',
                    data: tab[7],
                    backgroundColor: 'rgb(255, 153, 0)',
                },
                {
                    label: 'BC-NC',
                    data: tab[8],
                    backgroundColor: 'rgb(255, 235, 0)',
                },
                {
                    label: 'BC-DIV',
                    data: tab[9],
                    backgroundColor: 'rgb(238, 238, 238)',
                },

                {
                    label: 'BC-DVD',
                    data: tab[10],
                    backgroundColor: 'rgb(173, 193, 253)',
                },
                {
                    label: 'BC-UMP',
                    data: tab[11],
                    backgroundColor: 'rgb(0, 102, 204)',
                },
                {
                    label: 'BC-FN',
                    data: tab[12],
                    backgroundColor: 'rgb(13, 55, 138)',
                },
                {
                    label: 'BC-EXD',
                    data: tab[13],
                    backgroundColor: 'rgb(64, 64, 64)',
                },
                {
                    label: 'BC-REG',
                    data: tab[14],
                    backgroundColor: 'rgb(64, 64, 64)',
                },
            ]
            break;

        case "2011":
            nombre_nuances = 16;
            for (k = 0; k < nombre_canton; k++) {


                obj_dept.cantons[k] = { name: resultat_php[k][1], parti: new Array(nombre_nuances) };

            }

            for (i = 0; i < resultat_php.length; i++) {

                obj_dept.cantons[i].parti[0] = { name: 'BC-EXG', score: 0 };
                obj_dept.cantons[i].parti[1] = { name: 'BC-COM', score: 0 };
                obj_dept.cantons[i].parti[2] = { name: 'BC-RDG', score: 0 };
                obj_dept.cantons[i].parti[3] = { name: 'BC-VEC', score: 0 };
                obj_dept.cantons[i].parti[4] = { name: 'BC-DVG', score: 0 };
                obj_dept.cantons[i].parti[5] = { name: 'BC-ECO', score: 0 };
                obj_dept.cantons[i].parti[6] = { name: 'BC-SOC', score: 0 };
                obj_dept.cantons[i].parti[7] = { name: 'BC-MDM', score: 0 };
                obj_dept.cantons[i].parti[10] = { name: 'BC-NC', score: 0 };
                obj_dept.cantons[i].parti[8] = { name: 'BC-DIV', score: 0 };
                obj_dept.cantons[i].parti[9] = { name: 'BC-DVD', score: 0 };
                obj_dept.cantons[i].parti[11] = { name: 'BC-UMP', score: 0 };
                obj_dept.cantons[i].parti[12] = { name: 'BC-FN', score: 0 };
                obj_dept.cantons[i].parti[13] = { name: 'BC-EXD', score: 0 };
                obj_dept.cantons[i].parti[14] = { name: 'BC-REG', score: 0 };



                for (j = 3; j < resultat_php[i].length; j += 2) {
                    if (resultat_php[i][j] != null) {
                        for (k = 0; k < nombre_nuances; k++) {
                            if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                                obj_dept.cantons[i].parti[k].score += resultat_php[i][j];
                            }
                        }

                    }
                }
            }
         
            for (j = 0; j < nombre_nuances; j++) {
                for (i = 0; i < nombre_canton; i++) {
                    tab[j][i] = obj_dept.cantons[i].parti[j].score;
                }
            }
            datasets_année = [{
                label: 'BC-EXG',
                data: tab[0],
                backgroundColor: 'rgb(187, 0, 0)',
            },
            {
                label: 'BC-COM',
                data: tab[1],
                backgroundColor: 'rgb(221, 0, 0)',
            },
            {
                label: 'BC-RDG',
                data: tab[2],
                backgroundColor: 'rgb(255, 209, 220)',
            },
            {
                label: 'BC-VEC',
                data: tab[3],
                backgroundColor: 'rgb(0, 192, 0)',
            },
            {
                label: 'BC-DVG',
                data: tab[4],
                backgroundColor: 'rgb(255, 192, 192)',
            },
            {
                label: 'BC-ECO',
                data: tab[5],
                backgroundColor: 'rgb(0, 192, 0)',
            },
            {
                label: 'BC-SOC',
                data: tab[6],
                backgroundColor: 'rgb(255, 128, 128)',
            },
            {
                label: 'BC-MDM',
                data: tab[7],
                backgroundColor: 'rgb(255, 153, 0)',
            },
            {
                label: 'M-NC',
                data: tab[8],
                backgroundColor: 'rgb(255, 235, 0)',
            },
            {
                label: 'BC-DIV',
                data: tab[9],
                backgroundColor: 'rgb(238, 238, 238)',
            },

            {
                label: 'BC-DVD',
                data: tab[10],
                backgroundColor: 'rgb(173, 193, 253)',
            },
            {
                label: 'BC-UMP',
                data: tab[11],
                backgroundColor: 'rgb(0, 102, 204)',
            },
            {
                label: 'BC-FN',
                data: tab[12],
                backgroundColor: 'rgb(13, 55, 138)',
            },
            {
                label: 'BC-EXD',
                data: tab[13],
                backgroundColor: 'rgb(64, 64, 64)',
            },
            {
                label: 'BC-REG',
                data: tab[14],
                backgroundColor: 'rgb(64, 64, 64)',
            },
            ]
            break;
            

        case "2015":
            nombre_nuances = 19;
            for (k = 0; k < nombre_canton; k++) {


                obj_dept.cantons[k] = { name: resultat_php[k][1], parti: new Array(nombre_nuances) };

            }

            for (i = 0; i < resultat_php.length; i++) {

                obj_dept.cantons[i].parti[0] = { name: 'BC-EXG', score: 0 };
                obj_dept.cantons[i].parti[1] = { name: 'BC-FG', score: 0 };
                obj_dept.cantons[i].parti[2] = { name: 'BC-COM', score: 0 };
                obj_dept.cantons[i].parti[3] = { name: 'BC-PG', score: 0 };
                obj_dept.cantons[i].parti[4] = { name: 'BC-RDG', score: 0 };
                obj_dept.cantons[i].parti[5] = { name: 'BC-UG', score: 0 };
                obj_dept.cantons[i].parti[6] = { name: 'BC-VEC', score: 0 };
                obj_dept.cantons[i].parti[7] = { name: 'BC-DVG', score: 0 };
                obj_dept.cantons[i].parti[8] = { name: 'BC-SOC', score: 0 };
                obj_dept.cantons[i].parti[9] = { name: 'BC-MDM', score: 0 };
                obj_dept.cantons[i].parti[10] = { name: 'BC-UC', score: 0 };
                obj_dept.cantons[i].parti[11] = { name: 'BC-DIV', score: 0 };
                obj_dept.cantons[i].parti[12] = { name: 'BC-UD', score: 0 };
                obj_dept.cantons[i].parti[13] = { name: 'BC-UDI', score: 0 };
                obj_dept.cantons[i].parti[14] = { name: 'BC-DVD', score: 0 };
                obj_dept.cantons[i].parti[15] = { name: 'BC-UMP', score: 0 };
                obj_dept.cantons[i].parti[16] = { name: 'BC-DLF', score: 0 };
                obj_dept.cantons[i].parti[17] = { name: 'BC-FN', score: 0 };
                obj_dept.cantons[i].parti[18] = { name: 'BC-EXD', score: 0 };



                for (j = 3; j < resultat_php[i].length; j += 2) {
                    if (resultat_php[i][j] != null) {
                        for (k = 0; k < nombre_nuances; k++) {
                            if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                                obj_dept.cantons[i].parti[k].score += resultat_php[i][j];
                            }
                        }

                    }
                }
            }
           
            for (j = 0; j < nombre_nuances; j++) {
                for (i = 0; i < nombre_canton; i++) {
                    tab[j][i] = obj_dept.cantons[i].parti[j].score;
                }
            }
            datasets_année = [{
                    label: 'BC-EXG',
                    data: tab[0],
                    backgroundColor: 'rgb(187, 0, 0)',
                },
                {
                    label: 'BC-FG',
                    data: tab[1],
                    backgroundColor: 'rgb(221, 0, 0)',
                },
                {
                    label: 'BC-COM',
                    data: tab[2],
                    backgroundColor: 'rgb(221, 0, 0)',
                },
                {
                    label: 'BC-PG',
                    data: tab[3],
                    backgroundColor: 'rgb(245,142,187)',
                },
                {
                    label: 'BC-RDG',
                    data: tab[4],
                    backgroundColor: 'rgb(255, 209, 220)',
                },
                {
                    label: 'BC-UG',
                    data: tab[5],
                    backgroundColor: 'rgb(204, 102, 102)',
                },
                {
                    label: 'BC-VEC',
                    data: tab[6],
                    backgroundColor: 'rgb(0, 192, 0)',
                },
                {
                    label: 'BC-DVG',
                    data: tab[7],
                    backgroundColor: 'rgb(255, 192, 192)',
                },
                {
                    label: 'BC-SOC',
                    data: tab[8],
                    backgroundColor: 'rgb(255, 128, 128)',
                },
                {
                    label: 'BC-MDM',
                    data: tab[9],
                    backgroundColor: 'rgb(255, 153, 0)',
                },
                {
                    label: 'BC-UC',
                    data: tab[10],
                    backgroundColor: 'rgb(255, 235, 0)',
                },
                {
                    label: 'BC-DIV',
                    data: tab[11],
                    backgroundColor: 'rgb(238, 238, 238)',
                },
                {
                    label: 'BC-UD',
                    data: tab[12],
                    backgroundColor: 'rgb(135, 206, 250)',
                },
                {
                    label: 'BC-UDI',
                    data: tab[13],
                    backgroundColor: 'rgb(0, 255, 255)',
                },
                {
                    label: 'BC-DVD',
                    data: tab[14],
                    backgroundColor: 'rgb(173, 193, 253)',
                },
                {
                    label: 'BC-UMP',
                    data: tab[15],
                    backgroundColor: 'rgb(0, 102, 204)',
                },
                {
                    label: 'BC-DLF',
                    data: tab[16],
                    backgroundColor: 'rgb(0, 130, 196)',
                },
                {
                    label: 'BC-FN',
                    data: tab[17],
                    backgroundColor: 'rgb(13, 55, 138)',
                },
                {
                    label: 'BC-EXD',
                    data: tab[18],
                    backgroundColor: 'rgb(64, 64, 64)',
                },
            ]

            break;

        case "2021":
            nombre_nuances = 26;
            break;

        default:
            break;
    }

    console.log(obj_dept);

    /*** Création tab contenant les data de chaque partie par canton */

    const labels = [];
    for (let i = 0; i < nombre_canton; i++)
        labels[i] = resultat_php[i][1];
    const data = {
        labels: labels,
        datasets: datasets_année,

    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Résulats élections départementales - Tour 1'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    max: 100,
                }
            }
        }
    };



    document.getElementById("graphe_t1").innerHTML = "<canvas id=\"myChart\" width=\"1000\" height=\"350\"></canvas>";
    var myChart = new Chart(document.getElementById('myChart'), config);
}