let img_dep = document.getElementById("img_dep")
let img_reg = document.getElementById("img_reg")

let deroulant_dep = document.getElementById("deroulant_dep")
let label_deroulant_dep = document.getElementById("label_deroulant_dep")
let deroulant_reg = document.getElementById("deroulant_reg")
let label_deroulant_reg = document.getElementById("label_deroulant_reg")

let section_departement = document.getElementById("section_departement")
let section_region = document.getElementById("section_region")
let section_france = document.getElementById("section_france")


section_departement.style.display = "none"
section_region.style.display = "none"
section_france.style.display = "none"

var dep_valeur = document.getElementById("dep_choice").selectedIndex
document.getElementById("graph_dep").innerHTML = "<span id='test'> Hello </span>"




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


