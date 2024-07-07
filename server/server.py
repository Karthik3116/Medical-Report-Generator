import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Disable GPU

# Dl imports
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image


# llm1 imports 
import json
from keras.models import Model, load_model # type: ignore
from keras.preprocessing.sequence import pad_sequences # type: ignore
from keras.preprocessing.image import img_to_array # type: ignore
from keras.applications.inception_v3 import InceptionV3, preprocess_input  # type: ignore


#llm2 imports
from flask import Flask, request, jsonify# type: ignore
from werkzeug.utils import secure_filename # type: ignore
import os
from tensorflow.keras.preprocessing import image as keras_image # type: ignore
from tensorflow.keras.applications.densenet import preprocess_input # type: ignore
from tensorflow.keras.applications import DenseNet121 # type: ignore
from tensorflow.keras.models import Model # type: ignore
import pandas as pd # type: ignore


app = Flask(__name__)
CORS(app)

# Deep Learning

loaded_model = tf.keras.models.load_model("/home/professor/Documents/GitHub/temp2/medical_image_captioning/server/accumodelpp84.h5")

# Define a route to handle image uploads and predictions
@app.route("/predictdl", methods=["POST","GET"])
def predict():
    print("got request for dl")
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    if file and file.filename:
        # Preprocess the image
        img = Image.open(file).convert('L')
        img = img.resize((224, 224))  # Resize to match model input size
        img = img.convert('RGB')
        img_array = np.array(img) / 255.0  # Normalize pixel values

        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make prediction
        predicted_probs = loaded_model.predict(img_array)
        predicted_label = "Pneumothorax" if predicted_probs[0][0] > 0.5 else "No Pneumothorax"

        # Return prediction results
        return jsonify({"prediction": predicted_label, "probabilities": predicted_probs.tolist()})
    else:
        return jsonify({"error": "Invalid file format"})

#LLM

model = load_model('/home/professor/Documents/GitHub/temp2/medical_image_captioning/server/indianamodelTrue.keras')


# Load necessary pre-processing objects (wordtoix, ixtoword, max_length)
with open('/home/professor/Documents/GitHub/temp2/medical_image_captioning/server/ixtoword.json', 'r') as f:
    ixtoword = json.load(f)

with open('/home/professor/Documents/GitHub/temp2/medical_image_captioning/server/wordtoix.json', 'r') as f:
    wordtoix = json.load(f)

ixtoword = {int(k): v for k, v in ixtoword.items()}
wordtoix = {k: int(v) for k, v in wordtoix.items()}

max_length = 40
vocab_size = 408

base_model = InceptionV3(weights='imagenet') 
model1 = Model(base_model.input, base_model.layers[-2].output)


def preprocess_img(image): 
    # inception v3 excepts img in 299 * 299 * 3 
    image = image.convert('RGB')
    img = image.resize((299, 299))
    x = img_to_array(img) 
    # Add one more dimension 
    x = np.expand_dims(x, axis=0) 
    x = preprocess_input(x) 
    return x 

def encode(image): 
    image = preprocess_img(image) 
    vec = model1.predict(image) 
    vec = np.reshape(vec, (vec.shape[1])) 
    return vec 

@app.route('/predictllm', methods=['POST',"GET"])
def predictllm():
    try:
        file = request.files['file']
        img = Image.open(file)
        pic = encode(img).reshape(1,2048)
        start = 'startseq'
        for i in range(max_length):
            seq = [wordtoix[word] for word in start.split() if word in wordtoix]
            seq = pad_sequences([seq], maxlen=max_length)
            yhat = model.predict([pic, seq])
            yhat = np.argmax(yhat, axis=-1)
            word = ixtoword[yhat[0]]
            start += ' ' + word
            if word == 'endseq':
                break
        final = start.split()
        final = final[1:-1]
        final = ' '.join(final)

        return jsonify({'caption': final})
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == "__main__":
    app.run(debug=True )
