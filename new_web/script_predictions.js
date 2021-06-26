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
            chaine += "<th class='tour1_colonne_dep'>Nuance</th>";
            chaine += "<th class='tour1_colonne_dep'>% voix/inscrits</th>";
            chaine += "</tr>";
            for (i = 0; i < resultat_php.length; i++) {
                chaine += "<tr>";
                resultat_php[i].forEach(elem => {
                    chaine += "<td class='tour1_colonne_dep'>";
                    if (elem == null) {
                        chaine += "";
                    } else { chaine += elem; }
                    chaine += "</td>";
                })
                chaine += "</tr>";
            }
            chaine += "</table>";
            document.getElementById("tour_1").innerHTML = chaine;

            /* Traitement des données du tableau, création d'un dictionnaire regroupant les cantons et les scores par partis */
            var obj_dept = new Object();
            let nombre_canton = resultat_php.length;
            obj_dept.name = document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].text;
           
            obj_dept.cantons = new Array(nombre_canton);
            
           
            for (i = 0; i < resultat_php.length; i++) {
                

                if (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value == 2015) {
                    var nombre_nuances = 19;
                    for (k = 0; k < nombre_canton; k++) {
               
                
                        obj_dept.cantons[k] = {name: resultat_php[i][1], parti: new Array(nombre_nuances)};
                      
                    }
                    obj_dept.cantons[i].name = resultat_php[i][1];

                    obj_dept.cantons[i].parti[0] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[1] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[2] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[3] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[4] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[5] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[6] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[7] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[8] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[9] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[10] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[11] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[12] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[13] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[14] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[15] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[16] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[17] = {name: 'BC-EXG', score: 0};
                    obj_dept.cantons[i].parti[18] = {name: 'BC-EXG', score: 0};
                }

               

                for (j = 3; j < resultat_php[i].length; j += 2) {
                    if (resultat_php[i][j] != null) {
                        for (k = 0; k < nombre_nuances; k++) {
                            if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                                obj_dept.cantons[i].parti[k].score = resultat_php[i][j];
                            }
                        }

                    }
                }


            }
            console.log(obj_dept);
            /*** Création tab contenant les data de chaque partie par canton */
            var tab = [];
            for (j = 0; j < nombre_nuances; j++) {
                for (i = 0; i < nombre_canton; i++) {
                    tab[j][i] = obj_dept.cantons[i].parti[j].score;
                }
            }
            const labels = [];
            for (let i = 0; i < nombre_canton; i++)
                labels[i] = resultat_php[i][1];
            const data = {
                labels: labels,
                datasets: [{
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
                        label: 'BC-LR',
                        data: tab[15],
                        backgroundColor: 'rgb(0, 102, 204)',
                    },
                    {
                        label: 'BC-DLF',
                        data: tab[16],
                        backgroundColor: 'rgb(0, 130, 196)',
                    },
                    {
                        label: 'BC-RN',
                        data: tab[17],
                        backgroundColor: 'rgb(13, 55, 138)',
                    },
                    {
                        label: 'BC-EXD',
                        data: tab[18],
                        backgroundColor: 'rgb(64, 64, 64)',
                    },

                ]

            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Bar Chart - Stacked'
                        },
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            };

            var chainegraph = '<canvas id="myChart" width="1000" height="350"></canvas>';
            document.getElementById("graphe").innerHTML = chainegraph;
            var myChart = new Chart(document.getElementById('myChart'), config);

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
            var obj_dept = new Object();
            let nombre_canton = resultat_php.length;
            obj_dept.name = document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value;

            obj_dept.canton = [nombre_canton];
            for (i = 0; i < nombre_canton; i++) {
                obj_dept.canton[i].parti = [nombre_nuances];
            }

            for (i = 0; i < resultat_php.length; i++) {

                obj_dept.cantons[i].name = resultat_php[i][1];

                if (document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value == 2015) {
                    var nombre_nuances = 19;

                    obj_dept.cantons[i].parti[0].name = 'BC-EXG';
                    obj_dept.cantons[i].parti[1].name = 'BC-COM';
                    obj_dept.cantons[i].parti[2].name = 'BC-FG';
                    obj_dept.cantons[i].parti[3].name = 'BC-PG';
                    obj_dept.cantons[i].parti[4].name = 'BC-RDG';
                    obj_dept.cantons[i].parti[5].name = 'BC-UG';
                    obj_dept.cantons[i].parti[6].name = 'BC-VEC';
                    obj_dept.cantons[i].parti[7].name = 'BC-DVG';
                    obj_dept.cantons[i].parti[8].name = 'BC-SOC';
                    obj_dept.cantons[i].parti[9].name = 'BC-MDM';
                    obj_dept.cantons[i].parti[10].name = 'BC-UC';
                    obj_dept.cantons[i].parti[11].name = 'BC-DIV';
                    obj_dept.cantons[i].parti[12].name = 'BC-UD';
                    obj_dept.cantons[i].parti[13].name = 'BC-UDI';
                    obj_dept.cantons[i].parti[14].name = 'BC-DVD';
                    obj_dept.cantons[i].parti[15].name = 'BC-LR';
                    obj_dept.cantons[i].parti[16].name = 'BC-DLF';
                    obj_dept.cantons[i].parti[17].name = 'BC-FN';
                    obj_dept.cantons[i].parti[18].name = 'BC-EXD';
                }

                for (k = 0; k < nombre_nuances; k++) {
                    obj_dept.cantons[i].parti[k].score = 0;
                }

                for (j = 3; j < resultat_php[i].length; j += 2) {
                    if (resultat_php[i][j] != null) {
                        for (k = 0; k < nombre_nuances; k++) {
                            if (obj_dept.cantons[i].parti[k].name == resultat_php[i][j - 1]) {
                                obj_dept.canton[i].parti[0].score = resultat_php[i][j];
                            }
                        }

                    }
                }


            }
            for (j = 0; j < nombre_nuances; j++) {
                for (i = 0; i < nombre_canton; i++) {
                    var tab = [];
                    tab[j][i] = obj_dept.canton[i].parti[j].score;
                }
            }
            const labels = [];
            for (let i = 0; i < nombre_canton; i++)
                labels[i] = resultat_php[i][1];
            const data = {
                labels: labels,
                datasets: [{
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
                        label: 'BC-LR',
                        data: tab[15],
                        backgroundColor: 'rgb(0, 102, 204)',
                    },
                    {
                        label: 'BC-DLF',
                        data: tab[16],
                        backgroundColor: 'rgb(0, 130, 196)',
                    },
                    {
                        label: 'BC-RN',
                        data: tab[17],
                        backgroundColor: 'rgb(13, 55, 138)',
                    },
                    {
                        label: 'BC-EXD',
                        data: tab[18],
                        backgroundColor: 'rgb(64, 64, 64)',
                    },

                ]

            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Chart.js Bar Chart - Stacked'
                        },
                    },
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            };

            var chainegraph = '<canvas id="myChart" width="1000" height="350"></canvas>';
            document.getElementById("graphe").innerHTML = chainegraph;
            var myChart = new Chart(document.getElementById('myChart'), config);

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