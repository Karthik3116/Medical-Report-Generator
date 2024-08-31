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

loaded_model = tf.keras.models.load_model("/home/professor/Documents/GitHub/temp2/medical_image_captioning/Medical-Report-Generator/backend/accumodelpp84.h5")

def preprocess_image(image_path):
    original_img = tf.keras.preprocessing.image.load_img(image_path)
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    return original_img, img_array

# Define predict_image function
def predict_image(image_path, model):
    original_img, img_array = preprocess_image(image_path)
    predicted_probs = model.predict(img_array)
    predicted_label = "Pneumothorax" if predicted_probs[0][0] > 0.5 else "No Pneumothorax"
    return predicted_label, predicted_probs


# Define a route to handle image uploads and predictions
@app.route("/predictdl", methods=["POST","GET"])
def predict():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    # If file exists and is allowed extension
    if file:
        # Save the file to a temporary location
        temp_path = "/tmp/uploaded_image.png"
        file.save(temp_path)
        
        # Make prediction
        prediction, probabilities = predict_image(temp_path, loaded_model)
        
        # Return prediction result
        return jsonify({
            'prediction': prediction,
            'probabilities': probabilities.tolist()
        })

#LLM

model = load_model('/home/professor/Documents/GitHub/temp2/medical_image_captioning/Medical-Report-Generator/backend/indianamodel.keras')


# Load necessary pre-processing objects (wordtoix, ixtoword, max_length)
with open('/home/professor/Documents/GitHub/temp2/medical_image_captioning/Medical-Report-Generator/backend/ixtoword1.json', 'r') as f:
    ixtoword = json.load(f)

with open('/home/professor/Documents/GitHub/temp2/medical_image_captioning/Medical-Report-Generator/backend/wordtoix1.json', 'r') as f:
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

@app.route('/predictllm', methods=['POST', 'GET'])
def predictllm():
    try:

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})
        
        file = request.files['file']
      
        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        if file:
            
            temp_path = "/tmp/uploaded_image.png"
            file.save(temp_path)
            
            img = Image.open(temp_path)
            pic = encode(img).reshape(1, 2048)
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
            final_caption = ' '.join(start.split()[1:-1])
            
            
            prediction, probabilities = predict_image(temp_path, loaded_model)
            
            return jsonify({
                'caption': final_caption,
                'prediction': prediction,
                'probabilities': probabilities.tolist()
            })
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == "__main__":
    app.run(debug=True )
