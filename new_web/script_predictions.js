/* DECLARATIONS VARIABLES */
let img_dep = document.getElementById("img_dep")
let img_reg = document.getElementById("img_reg")

let deroulant_dep = document.getElementById("deroulant_dep")
let label_deroulant_dep = document.getElementById("label_deroulant_dep")
let deroulant_reg = document.getElementById("deroulant_reg")
let label_deroulant_reg = document.getElementById("label_deroulant_reg")

let section_departement = document.getElementById("section_departement")
let section_region = document.getElementById("section_region")
let section_france = document.getElementById("section_france")



/* RESET DES DIFFERENTS AFFICHAGES */

document.getElementById("section_departement").style.display = "none"
section_region.style.display = "none"
section_france.style.display = "none"


/* AFFICHAGE DES MENUS DEROULANTS */

function afficherDeroulantDep () {
    let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
    if(getComputedStyle(section_departement).display != "none"){
        section_departement.style.display = "none"
    } 
    else {
        section_departement.style.display = "block"
        section_region.style.display = "none"
        section_france.style.display = "none"
        document.getElementById("graph_dep").textContent = "Graph élections départementales"
        document.getElementById("dep_choix").value = "Default"
        document.getElementById("dep_annee_choix").value = "Default"

    }
}

function afficherDeroulantReg () {
    let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
    if(getComputedStyle(section_region).display != "none"){
        section_region.style.display = "none"
    } 
    else {
        section_region.style.display = "block"
        section_departement.style.display = "none"
        section_france.style.display = "none"
        document.getElementById("graph_reg").textContent = "Graph élections régionales"
        document.getElementById("reg_choix").value = "Default"
        document.getElementById("reg_annee_choix").value = "Default"
    }
}

function afficherDeroulantFr () {
    let scrollDiv = document.getElementById("texte_choix_echelle").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
    section_departement.style.display = "none"
    section_region.style.display = "none"
    section_france.style.display = "block"
}


/* RECUPERATION DE LA VALEUR CHOISIE DANS LES MENUS DEROULANTS */

function recuperer_departement_annee () {
    deroulant_dep_annee = document.getElementById("dep_annee_choix")
    annee_dep = deroulant_dep_annee.options[deroulant_dep_annee.selectedIndex].text
}

function recuperer_region_annee () {
    deroulant_reg_annee = document.getElementById("reg_annee_choix")
    annee_reg = deroulant_reg_annee.options[deroulant_reg_annee.selectedIndex].text
}

function recuperer_departement () {
    document.getElementById("graph_dep").textContent = "Graph élections départementales pour : "
    deroulant_dep = document.getElementById("dep_choix");
    texte = deroulant_dep.options[deroulant_dep.selectedIndex].text;
    document.getElementById("graph_dep").textContent = document.getElementById("graph_dep").textContent + texte + " en " + annee_dep
}

function recuperer_region () {
    document.getElementById("graph_reg").textContent = "Graph élections régionales pour : "
    deroulant_reg = document.getElementById("reg_choix");
    texte = deroulant_reg.options[deroulant_reg.selectedIndex].text;
    document.getElementById("graph_reg").textContent = document.getElementById("graph_reg").textContent + texte + " en " + annee_reg
}

/* DECLARATION VARIABLES */

var menuButton = document.querySelector('#menu-button');
var menu = document.querySelector('#menu');

/* OUVERTURE ET FERMETURE DU MENU BURGER */

menuButton.addEventListener('click',function(){
    document.getElementById("body").style.background = "images/fr_nb.png"
    menu.classList.toggle('show-menu')
    menuButton.classList.toggle('close')
})


/* RECHERCHE ET CONSTRUCTION GRAPH */

function lancer_recherche_dep() {
    let scrollDiv = document.getElementById("graph_dep").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
}

function lancer_recherche_reg() {
    let scrollDiv = document.getElementById("graph_reg").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
}



/* TEST FONCTION */

function test_fonction() {
    let checkbox = document.getElementById("checkbox_burger");
    let body = document.getElementById("body_id");
    if(checkbox.checked) body.style.overflowY="hidden";
    else body.style.overflowY="visible";
}