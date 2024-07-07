Medical Report Generator
The Medical Report Generator is a deep learning-based application designed to automatically generate captions for medical images. Leveraging advanced neural networks such as InceptionV3 and LSTM, this tool processes medical images to produce descriptive captions, aiding in the interpretation and documentation of medical findings.

Features
Image Preprocessing: Efficiently preprocesses medical images by resizing, normalizing, and converting them to the required format.
Image Encoding: Utilizes the InceptionV3 model to extract feature vectors from images, providing a robust representation for further processing.
Caption Generation: Employs an LSTM-based model to generate accurate and coherent captions for medical images, enhancing the interpretability of medical data.
Error Handling: Comprehensive error handling ensures smooth operation and provides meaningful feedback in case of issues.
Requirements
Python 3.10 or higher
TensorFlow 2.15.0
Keras 3.4.1
NumPy 1.26.4
Pillow 10.3.0
Flask (for web-based usage)
Flask-CORS (for handling CORS)
pandas 2.2.1
