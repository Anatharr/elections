import tensorflowjs as tfjs
import tensorflow as tf

models = [
	'Duel1.3'
]


for name in models:
	print('Converting ' + name)
	model = tf.keras.models.load_model(name)
	tfjs.converters.save_keras_model(model, 'js/'+name)