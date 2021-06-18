let img_dep = document.getElementById("img_dep")
let img_reg = document.getElementById("img_reg")
let deroulant_dep = document.getElementById("deroulant_dep")
let label_deroulant_dep = document.getElementById("label_deroulant_dep")
let deroulant_reg = document.getElementById("deroulant_reg")
let label_deroulant_reg = document.getElementById("label_deroulant_reg")
deroulant_dep.style.display = "none"
label_deroulant_dep.style.display = "none"
deroulant_reg.style.display = "none"
label_deroulant_reg.style.display = "none"


function afficherDeroulantDep () {
    if(getComputedStyle(deroulant_dep).display != "none"){
        deroulant_dep.style.display = "none"
        label_deroulant_dep.style.display = "none"
    } 
    else {
        deroulant_dep.style.display = "block"
        label_deroulant_dep.style.display = "block"
        deroulant_reg.style.display = "none"
        label_deroulant_reg.style.display = "none"
    }
}

function afficherDeroulantReg () {
    if(getComputedStyle(deroulant_reg).display != "none"){
        deroulant_reg.style.display = "none"
        label_deroulant_reg.style.display = "none"
    } 
    else {
        deroulant_reg.style.display = "block"
        label_deroulant_reg.style.display = "block"
        deroulant_dep.style.display = "none"
        label_deroulant_dep.style.display = "none"
    }
}

function afficherDeroulantFr () {
    deroulant_dep.style.display = "none"
    label_deroulant_dep.style.display = "none"

    deroulant_reg.style.display = "none"
    label_deroulant_reg.style.display = "none"
}
