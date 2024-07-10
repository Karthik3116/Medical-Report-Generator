import React, { useState } from 'react';
import axios from 'axios';
import './TestPage.css';
import { useNavigate } from 'react-router-dom';

const TestDL = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showAnotherPage, setShowAnotherPage] = useState(false);
    const [originalPRED, setOriginalPRED] = useState('');

    const navigate = useNavigate();

    const predefinedImages = [
        { id: 1, src: process.env.PUBLIC_URL + '/1_IM-0001-4001.dcm.png', originalPRED: 'Original Caption for Test 1' },
        { id: 2, src: process.env.PUBLIC_URL + '/logo512.png', originalPRED: 'Original Caption for Test 2' },
        { id: 3, src: process.env.PUBLIC_URL + '/path_to_test_image_3.jpg', originalPRED: 'Original Caption for Test 3' }
    ];

    const handleImageUpload = (imageSrc, testId, originalCaption) => {
        setImagePreview(imageSrc);
        setSelectedTest(testId);
        setOriginalPRED(originalCaption);
        setProbabilities(null); // Reset probabilities when a new image is selected
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (selectedTest !== null) {
                const response = await predictCaption(predefinedImages[selectedTest - 1].src);
                console.log('Response from predictCaption:', response); // Log the entire response to inspect its structure

                // Assuming response structure like { prediction: '...', probabilities: [...] }
                if (response && response.prediction) {
                    setPrediction(response.prediction);
                    setProbabilities(response.probabilities);
                } else {
                    console.error('Prediction data not found in response:', response);
                    // Handle the case where prediction data is not present in the response
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const predictCaption = async (imageSrc) => {
        try {
            // Create a Blob object from the image source
            const response = await fetch(imageSrc);
            const blob = await response.blob();

            // Create FormData and append the blob
            const formData = new FormData();
            formData.append('file', blob);

            // Send POST request to predictdl endpoint
            const predictionResponse = await axios.post('http://localhost:3020/predictdl', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Assuming response is JSON, adjust as per your server's response format
            return predictionResponse.data;
        } catch (error) {
            console.error('Error predicting caption:', error);
            throw error; // Propagate the error to handle it in handleSubmit
        }
    };

    return (
        <>
         <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       
        <div className="test-page-container">
            <h1>Test DL</h1>
            <div className="button-container">
                {predefinedImages.map((item) => (
                    <button key={item.id} onClick={() => handleImageUpload(item.src, item.id, item.originalPRED)} className="test-button">
                        Test {item.id}
                    </button>
                ))}
            </div>
            <div className="image-preview">
                {imagePreview && (
                    <>
                        <h3>Image Preview:</h3>
                        <img src={imagePreview} alt="Preview" className="preview-image" />
                    </>
                )}
            </div>
            <div className="captions">
                {originalPRED && (
                    <div className="caption">
                        <h3>Original Caption:</h3>
                        <p>{originalPRED}</p>
                    </div>
                )}
                {prediction && (
                    <div className="prediction-results">
                        <h3>Prediction: {prediction}</h3>
                        {probabilities && (
                            <div>
                                <h3>Probabilities:</h3>
                                <ul className="probabilities-list">
                                    {probabilities.map((prob, index) => (
                                        <li key={index}>{prob}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} disabled={!imagePreview || loading}>
                Submit Test {selectedTest || ''}
            </button>
            {loading && <p>Loading...</p>}
            {/* Toggle button for AnotherPage */}
            <button className="toggle-button" onClick={() => setShowAnotherPage(!showAnotherPage)}>
                {showAnotherPage ? 'Show Test Page' : 'Switch To LLM'}
            </button>
            
            {/* Conditionally render AnotherPage based on showAnotherPage state */}
            {showAnotherPage && navigate("/test")}
        </div>
        </>
    );
};

export default TestDL;
