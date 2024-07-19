import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";

const Deeplearning = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3020/predictdl', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrediction(response.data.prediction);
            setProbabilities(response.data.probabilities);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    const userValid = () => {
        let token = localStorage.getItem("userdbtoken");
        if (token) {
            console.log("user valid");
        } else {
            navigate("*");
        }
    };

    useEffect(() => {
        userValid();
    }, );


    return (
        <div className="llm-container">
            <div className="llm-box">
                <h1>Deep Learning</h1>
                <form onSubmit={handleSubmit} className="upload-form">
                    <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" className="file-input" />
                    <button type="submit" className="submit-button" disabled={!file || loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                {preview && (
                    <div className="image-preview">
                        <h3>Image Preview:</h3>
                        <img src={preview} alt="Selected Preview" className="preview-image" />
                    </div>
                )}
                {prediction && (
                    <div className="prediction-results">
                        <h3>Prediction:</h3>
                        <h3 className='prediction-text'>{prediction}</h3>
                        {/* {probabilities && (
                            <div>
                                <h3>Probabilities:</h3>
                                <ul className="probabilities-list">
                                    {probabilities.map((prob, index) => (
                                        <li key={index}>{prob}</li>
                                    ))}
                                </ul>
                            </div>
                        )} */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Deeplearning;
