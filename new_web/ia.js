baseURL = window.location.hostname;

async function getData(year) {
  const carsDataResponse = await fetch(baseURL + '/dataset/inputs/XDataFR_Bvot.csv');
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


async function load_model(year, canton) {
  const model = await tf.loadLayersModel(baseURL + '/models/'+year+'/'+duel+'/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
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

