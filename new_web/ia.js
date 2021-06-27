baseURL = window.location.hostname;

async function getData(year) {
  const carsDataResponse = await fetch(hostname + '/dataset/inputs/XDataFR_Bvot.csv');
  const carsData = await carsDataResponse.json();
  const cleaned = carsData.map(car => ({
    mpg: car.Miles_per_Gallon,
    horsepower: car.Horsepower,
  }))
  .filter(car => (car.mpg != null && car.horsepower != null));

  return cleaned;
}

async function getData() {
  const img = await webcam.capture();
  const processedImg =
      tf.tidy(() => img.expandDims(0).toFloat().div(127).sub(1));
  img.dispose();
  return processedImg;
}


async function loadTruncatedMobileNet() {
  const mobilenet = await tf.loadLayersModel(hostname + '/models/'+duel+'/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
}

function fill_cantons() {
  var cantonSelect = document.getElementById('model_canton')
  cantonSelect.children.forEach((e) => {
    if (e.value!='default') {
      cantonSelect.removeChild(e);
    }
  })

  jQuery.ajax({
          type: "POST",
          url: 'traitement.php',
          dataType: 'json',
          data: { functionname: 'affiche_tour_1_departement', arguments: [document.getElementById("dep_annee_choix").options[deroulant_dep_annee.selectedIndex].value, document.getElementById("dep_choix").options[deroulant_dep.selectedIndex].value] },

          success: function(obj, textstatus) {
              if (!('error' in obj)) {
                    resultat_php_tab.forEach((e) => {
                      var opt = document.createElement('option');
                      opt.value = e[0];
                      opt.innerHTML = e[1]+' ('+e[0]+')';
                      cantonSelect.appendChild(opt);
                    })
              } else {
                  console.log(obj.error);
              }
            }

          error: function(chr, ajaxOptions, thrownError) {
              alert(chr.responseText); //Ce code affichera le message d'erreur, ici Message d'erreur.
          }          
    })
}

function lancer_prediction() {
  const yearSelect = document.getElementById('model_year')
  const cantonSelect = document.getElementById('model_canton')
  const year = yearSelect.options[yearSelect.selectedIndex].value
  const canton = cantonSelect.options[cantonSelect.selectedIndex].value

  // const model = load_model(year, canton)





  // const inputData = await getData(year)
}


async function predict() {
  // Capture the frame from the webcam.
  const img = await getImage();

  // Make a prediction through mobilenet, getting the internal activation of
  // the mobilenet model, i.e., "embeddings" of the input images.
  const embeddings = truncatedMobileNet.predict(img);

  // Make a prediction through our newly-trained model using the embeddings
  // from mobilenet as input.
  const predictions = model.predict(embeddings);

  // Returns the index with the maximum probability. This number corresponds
  // to the class the model thinks is the most probable given the input.
  const predictedClass = predictions.as1D().argMax();
  const classId = (await predictedClass.data())[0];
  img.dispose();

  ui.predictClass(classId);
  await tf.nextFrame();
}

