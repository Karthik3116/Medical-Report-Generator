import React, { useState } from 'react';
import axios from 'axios';
import "./Dashboard.css";

function Llm() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('http://localhost:3020/predictllm', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCaption(response.data.caption);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="llm-container">
            <div className="llm-box">
                <h1>LLM</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <input type="file" onChange={handleImageUpload} accept=".jpg, .jpeg, .png" className="file-input" />
                    <button type="submit" className="submit-button" disabled={!image || loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
                
                {imagePreview && (
                    <div className="image-preview">
                        <h3>Image Preview:</h3>
                        <img src={imagePreview} alt="Preview" className="preview-image" />
                    </div>
                )}
                {caption && (
                    <div className="caption">
                        <h3>Caption:</h3>
                        <p>{caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Llm;
