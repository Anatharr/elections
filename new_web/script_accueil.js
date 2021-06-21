/* DECLARATION VARIABLES */

var menuButton = document.querySelector('#menu-button');
var menu = document.querySelector('#menu');

/* OUVERTURE ET FERMETURE DU MENU BURGER */

menuButton.addEventListener('click',function(){
    document.getElementById("body").style.background = "images/fr_nb.png"
    menu.classList.toggle('show-menu')
    menuButton.classList.toggle('close')
})