import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";

const Deeplearning = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
   

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="container">
            <h1>Deep Learning</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
            {preview && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={preview} alt="Selected Preview" style={{ width: '200px', height: 'auto' }} />
                </div>
            )}
            {prediction && (
                <div>
                    <div>Prediction: {prediction}</div>
                    {probabilities && (
                        <div>
                            <h3>Probabilities:</h3>
                            <ul>
                                {probabilities.map((prob, index) => (
                                    <li key={index}>{prob}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Deeplearning;
