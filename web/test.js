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

section_departement.style.display = "none"
section_region.style.display = "none"
section_france.style.display = "none"


/* AFFICHAGE DES MENUS DEROULANTS */

function afficherDeroulantDep () {
    if(getComputedStyle(section_departement).display != "none"){
        section_departement.style.display = "none"
    } 
    else {
        section_departement.style.display = "block"
        section_region.style.display = "none"
        section_france.style.display = "none"
    }
}

function afficherDeroulantReg () {
    if(getComputedStyle(section_region).display != "none"){
        section_region.style.display = "none"
    } 
    else {
        section_region.style.display = "block"
        section_departement.style.display = "none"
        section_france.style.display = "none"
    }
}

function afficherDeroulantFr () {
    section_departement.style.display = "none"
    section_region.style.display = "none"
    section_france.style.display = "block"
}


/* RECUPERATION DE LA VALEUR CHOISIE DANS LES MENUS DEROULANTS */

function recuperer_departement () {
    document.getElementById("graph_dep").textContent = "Graph élections départementales pour :"
    deroulant = document.getElementById("dep_choice");
    texte = deroulant.options[deroulant.selectedIndex].text;
    document.getElementById("graph_dep").textContent += texte    
}

function recuperer_region () {
    document.getElementById("graph_reg").textContent = "Graph élections régionales pour :"
    deroulant = document.getElementById("reg_choice");
    texte = deroulant.options[deroulant.selectedIndex].text;
    document.getElementById("graph_reg").textContent += texte    
}



