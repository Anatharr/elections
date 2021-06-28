available_models = ['BC-COM_BC-DVD_BC-FN', 'BC-COM_BC-FN', 'BC-COM_BC-FN_BC-UD', 'BC-COM_BC-FN_BC-UDI',
  'BC-COM_BC-UD', 'BC-DIV_BC-DVD', 'BC-DIV_BC-DVD_BC-FN', 'BC-DIV_BC-DVG', 'BC-DIV_BC-DVG_BC-FN',
  'BC-DIV_BC-FN', 'BC-DIV_BC-FN_BC-UD', 'BC-DIV_BC-MDM', 'BC-DIV_BC-UD', 'BC-DIV_BC-UMP', 'BC-DLF_BC-UG',
  'BC-DVD_BC-DVG', 'BC-DVD_BC-DVG_BC-FN', 'BC-DVD_BC-FG', 'BC-DVD_BC-FN', 'BC-DVD_BC-FN_BC-RDG', 'BC-DVD_BC-FN_BC-SOC', 'BC-DVD_BC-FN_BC-UD', 'BC-DVD_BC-FN_BC-UDI', 'BC-DVD_BC-FN_BC-UG', 'BC-DVD_BC-FN_BC-UMP', 'BC-DVD_BC-RDG', 'BC-DVD_BC-SOC', 'BC-DVD_BC-UD', 'BC-DVD_BC-UDI', 'BC-DVD_BC-UDI_BC-UG', 'BC-DVD_BC-UG', 'BC-DVD_BC-UMP', 'BC-DVD_BC-VEC', 'BC-DVG_BC-FG', 'BC-DVG_BC-FN', 'BC-DVG_BC-FN_BC-RDG', 'BC-DVG_BC-FN_BC-SOC', 'BC-DVG_BC-FN_BC-UD', 'BC-DVG_BC-FN_BC-UDI', 'BC-DVG_BC-FN_BC-UMP', 'BC-DVG_BC-MDM', 'BC-DVG_BC-SOC', 'BC-DVG_BC-UC', 'BC-DVG_BC-UD', 'BC-DVG_BC-UDI', 'BC-DVG_BC-UG', 'BC-DVG_BC-UMP', 'BC-EXD_BC-FN', 'BC-EXD_BC-UG', 'BC-EXD_BC-UMP', 'BC-FG_BC-FN', 'BC-FG_BC-FN_BC-UD', 'BC-FG_BC-SOC', 'BC-FG_BC-UD', 'BC-FG_BC-UDI', 'BC-FG_BC-UG', 'BC-FG_BC-UMP', 'BC-FN_BC-MDM', 'BC-FN_BC-MDM_BC-UD', 'BC-FN_BC-RDG', 'BC-FN_BC-RDG_BC-UD', 'BC-FN_BC-SOC', 'BC-FN_BC-SOC_BC-UC', 'BC-FN_BC-SOC_BC-UD', 'BC-FN_BC-SOC_BC-UDI', 'BC-FN_BC-SOC_BC-UMP', 'BC-FN_BC-UD', 'BC-FN_BC-UDI', 'BC-FN_BC-UDI_BC-UG', 'BC-FN_BC-UD_BC-UG', 'BC-FN_BC-UG', 'BC-FN_BC-UG_BC-UMP', 'BC-FN_BC-UMP', 'BC-FN_BC-UMP_BC-VEC', 'BC-FN_BC-VEC', 'BC-MDM_BC-SOC', 'BC-MDM_BC-UMP', 'BC-RDG_BC-SOC', 'BC-RDG_BC-UD', 'BC-RDG_BC-UDI', 'BC-RDG_BC-UG', 'BC-SOC_BC-UC', 'BC-SOC_BC-UD', 'BC-SOC_BC-UDI', 'BC-SOC_BC-UMP', 'BC-UC_BC-UG', 'BC-UDI_BC-UG', 'BC-UDI_BC-UMP', 'BC-UD_BC-UDI', 'BC-UD_BC-UG', 'BC-UD_BC-UMP', 'BC-UD_BC-VEC', 'BC-UG_BC-UMP', 'BC-UMP_BC-VEC']



async function getData(year) {
  const dataset = await fetch('/datasets/XDataFR_'+year+'_Can.csv');

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
        if (data[i][0] == canton.toString()) {
            console.log("donnée :" + data[i][k]);
            console.log("float :" + parseFloat(data[i][k + 1]));
            while (data[i][k] != null) {
                if (parseFloat(data[i][k + 1]) > 50.0) {
                    retour = [];
                    retour.push(data[i][k]);
                    console.log("50% :" + retour);
                    return retour;
                }
                if (parseFloat(data[i][k + 1]) > 12.5) {
                    retour.push(data[i][k]);
                    console.log("12.5% :" + retour);
                }
                k = k + 2;
            }
        }
    }
    console.log("résultat :" + retour);
    return retour;
}


async function load_model(year, canton) {

  jQuery.ajax({
      type: "POST",
      url: 'traitement.php',
      dataType: 'json',
      data: { functionname: 'donnees_ia_tour_1_departement', arguments: [year, canton] },

      success: function(obj, textstatus) {
          if (!('error' in obj)) {
              var dataT1 = obj.result
          } else {
              console.log(obj.error);
          }
      },

      error: function(chr, ajaxOptions, thrownError) {
          alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
      }
  })


  duel = getDuel(dataT1, canton).sort().join('_');
  console.log(duel)

  const model = await tf.loadLayersModel('/models/'+year+'/'+duel+'/model.json');
  return model;
}


function lancer_prediction() {
  const yearSelect = document.getElementById('model_year')
  const cantonSelect = document.getElementById('model_canton')
  const year = yearSelect.options[yearSelect.selectedIndex].value
  const canton = cantonSelect.options[cantonSelect.selectedIndex].value

  const model = load_model(year, canton)





  // const inputData = await getData(year)
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

