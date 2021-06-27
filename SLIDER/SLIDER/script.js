function initialisation(id) {
    var somme_value = 0;
    var slider = document.getElementById(id);
    var value = document.getElementById(id + "_value")
    var variable_bloquante = 1;

    value.innerHTML = slider.value;

    for(var i=1; i<20; i++) {

        somme_value = somme_value + parseInt(document.getElementById(i + "_value").innerHTML)

        if(somme_value > 100) {
            variable_bloquante = i;
            console.log(somme_value - 100);
            document.getElementById(i + "_value").innerHTML = parseInt(document.getElementById(variable_bloquante + "_value").innerHTML - (somme_value - 100));
            document.getElementById("somme_value").innerHTML = parseInt(somme_value) - (somme_value - 100);
            document.getElementById(i).value = parseInt(document.getElementById(i + "_value").innerHTML);
            break;
        }
        else {
            document.getElementById("somme_value").innerHTML = parseInt(somme_value);
        }
    }  
    console.log("Variable bloquante" + variable_bloquante);
}
