available_models = ['BC-COM_BC-DVD_BC-FN', 'BC-COM_BC-FN', 'BC-COM_BC-FN_BC-UD', 'BC-COM_BC-FN_BC-UDI',
    'BC-COM_BC-UD', 'BC-DIV_BC-DVD', 'BC-DIV_BC-DVD_BC-FN', 'BC-DIV_BC-DVG', 'BC-DIV_BC-DVG_BC-FN',
    'BC-DIV_BC-FN', 'BC-DIV_BC-FN_BC-UD', 'BC-DIV_BC-MDM', 'BC-DIV_BC-UD', 'BC-DIV_BC-UMP', 'BC-DLF_BC-UG',
    'BC-DVD_BC-DVG', 'BC-DVD_BC-DVG_BC-FN', 'BC-DVD_BC-FG', 'BC-DVD_BC-FN', 'BC-DVD_BC-FN_BC-RDG', 'BC-DVD_BC-FN_BC-SOC', 'BC-DVD_BC-FN_BC-UD', 'BC-DVD_BC-FN_BC-UDI', 'BC-DVD_BC-FN_BC-UG', 'BC-DVD_BC-FN_BC-UMP', 'BC-DVD_BC-RDG', 'BC-DVD_BC-SOC', 'BC-DVD_BC-UD', 'BC-DVD_BC-UDI', 'BC-DVD_BC-UDI_BC-UG', 'BC-DVD_BC-UG', 'BC-DVD_BC-UMP', 'BC-DVD_BC-VEC', 'BC-DVG_BC-FG', 'BC-DVG_BC-FN', 'BC-DVG_BC-FN_BC-RDG', 'BC-DVG_BC-FN_BC-SOC', 'BC-DVG_BC-FN_BC-UD', 'BC-DVG_BC-FN_BC-UDI', 'BC-DVG_BC-FN_BC-UMP', 'BC-DVG_BC-MDM', 'BC-DVG_BC-SOC', 'BC-DVG_BC-UC', 'BC-DVG_BC-UD', 'BC-DVG_BC-UDI', 'BC-DVG_BC-UG', 'BC-DVG_BC-UMP', 'BC-EXD_BC-FN', 'BC-EXD_BC-UG', 'BC-EXD_BC-UMP', 'BC-FG_BC-FN', 'BC-FG_BC-FN_BC-UD', 'BC-FG_BC-SOC', 'BC-FG_BC-UD', 'BC-FG_BC-UDI', 'BC-FG_BC-UG', 'BC-FG_BC-UMP', 'BC-FN_BC-MDM', 'BC-FN_BC-MDM_BC-UD', 'BC-FN_BC-RDG', 'BC-FN_BC-RDG_BC-UD', 'BC-FN_BC-SOC', 'BC-FN_BC-SOC_BC-UC', 'BC-FN_BC-SOC_BC-UD', 'BC-FN_BC-SOC_BC-UDI', 'BC-FN_BC-SOC_BC-UMP', 'BC-FN_BC-UD', 'BC-FN_BC-UDI', 'BC-FN_BC-UDI_BC-UG', 'BC-FN_BC-UD_BC-UG', 'BC-FN_BC-UG', 'BC-FN_BC-UG_BC-UMP', 'BC-FN_BC-UMP', 'BC-FN_BC-UMP_BC-VEC', 'BC-FN_BC-VEC', 'BC-MDM_BC-SOC', 'BC-MDM_BC-UMP', 'BC-RDG_BC-SOC', 'BC-RDG_BC-UD', 'BC-RDG_BC-UDI', 'BC-RDG_BC-UG', 'BC-SOC_BC-UC', 'BC-SOC_BC-UD', 'BC-SOC_BC-UDI', 'BC-SOC_BC-UMP', 'BC-UC_BC-UG', 'BC-UDI_BC-UG', 'BC-UDI_BC-UMP', 'BC-UD_BC-UDI', 'BC-UD_BC-UG', 'BC-UD_BC-UMP', 'BC-UD_BC-VEC', 'BC-UG_BC-UMP', 'BC-UMP_BC-VEC'
]

$(document).ready(function() {
    sel = document.getElementById('model_name')
    available_models.forEach(e => {
        var opt = document.createElement('option');
        opt.value = '2015_' + e;
        opt.innerHTML = 'Modèle 2015 (' + e.split('_').map(e => e.slice(3)).join(' ') + ')';
        sel.appendChild(opt);
    })
});

async function getData(year) {
    const dataset = await fetch('/datasets/XDataFR_' + year + '_Can.csv');

    // const carsData = await carsDataResponse.json();
    // const cleaned = carsData.map(car => ({
    //   mpg: car.Miles_per_Gallon,
    //   horsepower: car.Horsepower,
    // }))
    // .filter(car => (car.mpg != null && car.horsepower != null));


    // const img = await webcam.capture();
    // const processedImg =
    //     tf.tidy(() => img.expandDims(0).toFloat().div(127).sub(1));
    // img.dispose();
    // return processedImg;

    // return cleaned;
}

function getDuel(data, canton) {
    let retour = [];
    let k = 2;
    for (i = 0; i < data.length; i++) {
        if (data[i][0] == canton) {
            console.log("donnée :" + data[i][k]);
            console.log("Inscrits :" + parseFloat(data[i][k + 1]));
            console.log("Exprimés :" + parseFloat(data[i][k + 2]));
            while (data[i][k] != null) {
                if (parseFloat(data[i][k + 2]) > 50.0 && parseFloat(data[i][k + 1] > 25.0)) {
                    retour = [];
                    retour.push(data[i][k]);
                    console.log("majorité absolue :" + retour);
                    return retour;
                }
                if (parseFloat(data[i][k + 2]) > 12.5) {
                    retour.push(data[i][k]);
                    console.log("Plus de 12.5% des voix :" + retour);
                }
                k = k + 3;
            }
        }
    }
    console.log("résultat :" + retour);
    return retour;
}


async function load_model(dataT1, year, canton) {

    var duel = getDuel(dataT1, canton).sort();
    console.log("DUEL :" + duel)

    if (duel.length < 2) {
        alert("La détection automatique a détecté une majorité absolue, pour faire une prédiction veuillez choisir un modèle manuellement.");
        return null;
    }

    duel = duel.join('_')
    if (!available_models.includes(duel)) {
        alert("La détection automatique n'a pas trouvé de modèle correspondant, veuillez sélectionner manuellement un modèle ou changer de canton.");
        return null;
    }

    const model = await tf.loadLayersModel('/models/' + year + '/' + duel + '/model.json');
    return model;
}


async function lancer_prediction() {
    const modelSelect = document.getElementById('model_name')
    const dptSelect = document.getElementById("dep_choix")
    const cantonSelect = document.getElementById('model_canton')
    const modelname = modelSelect.options[modelSelect.selectedIndex].value
    const dpt = dptSelect.options[dptSelect.selectedIndex].value
    const canton = cantonSelect.options[cantonSelect.selectedIndex].value
    let a = null;
    let b = canton;
    const year=2015;

    if (canton == 'default') {
        alert("Veuillez spécifier un canton pour réaliser la prédiction.");
        return;
    }

    console.log('DPT : '+dpt)

    var dataT1 = await $.ajax({
        type: "POST",
        url: 'traitement.php',
        dataType: 'json',
        data: { functionname: 'donnees_ia_tour_1_departement', arguments: [year, dpt] },
        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }
    });
    if ('error' in dataT1) {
        console.log(dataT1.error);
        return;
    }
    console.log(dataT1)
    dataT1 = dataT1.result;

    const model = await load_model(dataT1, year, canton);
    if (model == null) return;

    const inputData = await recupererCsv(dpt, canton)

    console.log('Received')
    console.log(inputData)
    console.log(model)

    tab_pred_ia = document.getElementByClassName('resultats_ia');
    let chaine = "<table id = 'tab_chaine_ia'>"
    chaine += "<tr id = 'ligne1_chaine_ia'>"
    for (let i = 0; i < getDuel(a, b).length; i++) {
        chaine += "<td>" + getDuel(a, b)[i] + "</td>";
    }
    chaine += "<tr id = 'ligne2_chaine_ia'>"
    for (let j = 0; j < getDuel(a, b).length; j++) {
        chaine += "<td>" + "pourcentage..." + "</td>";
    }
    chaine += "</tr>" + "</table>";
    tab_pred_ia.innerHTML = chaine;

}



function recupererCsv(departement, canton) {
    return $.ajax({
        type: "GET",
        url: "/datasets/XDataFR_2015_Can.csv",
        dataType: "text",
        success: function(data) {

            var allTextLines = data.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');
            var lines = [];

            for (var x = 1; x < allTextLines.length; x++) {
                var data = allTextLines[x].split(',');
                if (data.length == headers.length) {

                    var tarr = [];
                    for (var y = 0; y < headers.length; y++) {
                        tarr.push(data[y]);
                    }
                    lines.push(tarr);
                }
            }

            let ligne;
            let j = 0;
            let tab_final = [];
            for (let i = 0; i < lines.length; i++) {
                if (lines[i][0] == departement) {
                    ligne = i;
                    break;

                }
            }

            j = ligne;
            while (lines[j][0] == departement) {
                if (lines[j][1] == canton) {
                    for (let k = 0; k < lines[j].length; k++) {
                        tab_final[k] = lines[j][k];
                    }
                    break;
                }
                j++;
            }
            console.log(tab_final);
            return tab_final;
        }
    });
}


// async function predict() {
//   // Capture the frame from the webcam.
//   const img = await getImage();

//   // Make a prediction through mobilenet, getting the internal activation of
//   // the mobilenet model, i.e., "embeddings" of the input images.
//   const embeddings = truncatedMobileNet.predict(img);

//   // Make a prediction through our newly-trained model using the embeddings
//   // from mobilenet as input.
//   const predictions = model.predict(embeddings);

//   // Returns the index with the maximum probability. This number corresponds
//   // to the class the model thinks is the most probable given the input.
//   const predictedClass = predictions.as1D().argMax();
//   const classId = (await predictedClass.data())[0];
//   img.dispose();

//   ui.predictClass(classId);
//   await tf.nextFrame();
// }