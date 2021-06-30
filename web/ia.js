
function getDuel(data, canton) {
    let retour = [];
    let k = 2;
    for (i = 0; i < data.length; i++) {
        if (data[i][0] == canton) {
            while (data[i][k] != null) {
                if (parseFloat(data[i][k + 2]) > 50.0 && parseFloat(data[i][k + 1] > 25.0)) {
                    retour = [];
                    retour.push(data[i][k]);
                    return retour;
                }
                if (parseFloat(data[i][k + 2]) > 12.5) {
                    retour.push(data[i][k]);
                }
                k = k + 3;
            }
        }
    }
    return retour.sort();
}


async function load_model(dataT1, year, canton, modelname) {

    modelname = modelname=='default' ? 'default' : modelname.slice(5)

    if (modelname=='default') {
      var duel = getDuel(dataT1, canton);
      console.log("DUEL :" + duel);

      if (duel.length < 2) {
          alert("La détection automatique a détecté une majorité absolue, pour faire une prédiction veuillez choisir un modèle manuellement.");
          return null;
      }

      duel = duel.join('_')
      if (!available_models.includes(duel)) {
          alert("La détection automatique n'a pas trouvé de modèle correspondant, veuillez sélectionner manuellement un modèle ou changer de canton.");
          return null;
      }
      load_image(year, duel)
      const model = await tf.loadLayersModel('/models/' + year + '/' + duel + '/model.json');
      return model;
    }
    else if (!available_models.includes(modelname)) {
      alert("Le modèle spécifié n'a pas été trouvé.");
      return null;      
    }

    load_image(year, modelname)
    const model = await tf.loadLayersModel('/models/' + year + '/' + modelname + '/model.json');
    return model;
}


function load_image(year, modelname) {
  img = document.getElementById('image_ia');
  img.src = "/models/"+year+"-figures/"+modelname+".png";
  document.getElementsByClassName('details_ia')[0].style.display = 'block';
  document.getElementById('model_name_image').innerHTML = modelname;
}

async function lancer_prediction() {
    const modelSelect = document.getElementById('model_name')
    const dptSelect = document.getElementById("dep_choix")
    const cantonSelect = document.getElementById('model_canton')
    const modelname = modelSelect.options[modelSelect.selectedIndex].value
    const dpt = dptSelect.options[dptSelect.selectedIndex].value
    const canton = cantonSelect.options[cantonSelect.selectedIndex].value
    const year=2015;

    if (canton == 'default') {
        alert("Veuillez spécifier un canton pour réaliser la prédiction.");
        return;
    }

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

    dataT1 = dataT1.result;

    const model = await load_model(dataT1, year, canton, modelname);
    if (model == null) return;

    const inputData = await getInput(year, dpt, canton);
    if ('error' in inputData) {
        console.log(dataT1.error);
        return;
    }


    input = tf.tensor(inputData.result[0].map(parseFloat)).expandDims(0)
    output = model.predict(input)
    // output = tf.tensor([0, 0, 0, 0, 0, 0]).expandDims(0)


    output = await output.array()
    var duel = getDuel(dataT1, canton)


    document.getElementsByClassName('resultats_ia')[0].style.display = 'block';
    tab_pred_ia = document.getElementById('tab_chaine_ia_div');
    let chaine = "<table id='tab_chaine_ia'>"
    chaine += "<label class='label_ia'>Prédictions de nos modèles</label>";
    chaine += "<tr id='ligne1_chaine_ia'>"
    for (let i = 0; i < duel.length; i++) {
        chaine += "<td>" + duel[i] + "</td>";
    }
    chaine += "<tr id='ligne2_chaine_ia'>"
    for (let j = 0; j < duel.length; j++) {
        chaine += "<td>" + output[0][j] + "</td>";
    }
    chaine += "</tr>" + "</table>";
    tab_pred_ia.innerHTML = chaine;

}


function getInput(year, departement, canton) {
  return $.ajax({
        type: "POST",
        url: 'traitement.php',
        dataType: 'json',
        data: { functionname: 'donnees_ia_tour_1_input', arguments: [year, departement, canton] },
        error: function(chr, ajaxOptions, thrownError) {
            alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
        }
    });
}


function recupererCsv(departement, canton) {
    return $.ajax({
        type: "GET",
        url: "/datasets/XDataFR_2015_Can.csv",
        dataType: "text",
        success: function(data) {

            var allTextLines = data.split(/\r\n|\n/);
            var headers = allTextLines[0].split(';');
            var lines = [];

            for (var x = 1; x < allTextLines.length; x++) {
                var data = allTextLines[x].split(';');
                if (data.length == headers.length) {

                    var tarr = [];
                    for (var y = 0; y < headers.length; y++) {
                        tarr.push(data[y]);
                    }
                    lines.push(tarr);
                }
            }

            for (let i = 0; i < lines.length; i++) {
              if (lines[i][0]==departement && lines[i][1]==canton) {
                return lines[i];
              }
            }
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