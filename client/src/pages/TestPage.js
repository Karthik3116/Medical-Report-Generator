// import React, { useState } from 'react';
// import {useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './TestPage.css';


// const TestPage = () => {
//     const [imagePreview, setImagePreview] = useState(null);
//     const [originalCaption, setOriginalCaption] = useState('');
//     const [predictedCaption, setPredictedCaption] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [selectedTest, setSelectedTest] = useState(null);
//     const [showAnotherPage, setShowAnotherPage] = useState(false);
//     const navigate = useNavigate();

//     const predefinedImages = [
//         { id: 1, src: process.env.PUBLIC_URL + '/1_IM-0001-4001.dcm.png', originalCaption: 'Original Caption for Test 1' },
//         { id: 2, src: process.env.PUBLIC_URL + '/logo512.png', originalCaption: 'Original Caption for Test 2' },
//         { id: 3, src: process.env.PUBLIC_URL + '/path_to_test_image_3.jpg', originalCaption: 'Original Caption for Test 3' }
//     ];

//     const handleImageUpload = (imageSrc, testId) => {
//         setImagePreview(imageSrc);
//         setSelectedTest(testId);
//         setOriginalCaption('');
//         setPredictedCaption('');
//     };

//     const handleSubmit = async () => {
//         setLoading(true);
    
//         try {
//             if (selectedTest !== null) {
//                 const response = await predictCaption(predefinedImages[selectedTest - 1].src);
//                 console.log('Response from predictCaption:', response); // Log the entire response to inspect its structure
                
//                 // Check if 'caption' exists in response.data before destructuring
//                 if (response && response.caption) {
//                     setPredictedCaption(response.caption);
//                     setOriginalCaption(predefinedImages[selectedTest - 1].originalCaption);
//                 } else {
//                     console.error('Caption not found in response:', response);
//                     // Handle the case where 'caption' is not present in the response
//                 }
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     const predictCaption = async (imageSrc) => {
//         try {
//             // Create a Blob object from the image source
//             const response = await fetch(imageSrc);
//             const blob = await response.blob();
    
//             // Create FormData and append the blob
//             const formData = new FormData();
//             formData.append('file', blob);
    
//             // Send POST request to predictllm endpoint
//             const predictionResponse = await axios.post('http://localhost:3020/predictllm', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
    
//             // Assuming response is JSON, adjust as per your server's response format
//             return predictionResponse.data;
//         } catch (error) {
//             console.error('Error predicting caption:', error);
//             throw error; // Propagate the error to handle it in handleSubmit
//         }
//     };
    
    

//     return (
//         <>
//         <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
//         <div className="test-page-container">
//             <h1>Test Page</h1>
//             <div className="button-container">
//                 {predefinedImages.map((item) => (
//                     <button key={item.id} onClick={() => handleImageUpload(item.src, item.id)} className="test-button">
//                         Test {item.id}
//                     </button>
//                 ))}
//             </div>
//             <div className="image-preview">
//                 {imagePreview && (
//                     <>
//                         <h3>Image Preview:</h3>
//                         <img src={imagePreview} alt="Preview" className="preview-image" />
//                     </>
//                 )}
//             </div>
//             <div className="captions">
//                 {originalCaption && (
//                     <div className="caption">
//                         <h3>Original Caption:</h3>
//                         <p>{originalCaption}</p>
//                     </div>
//                 )}
//                 {predictedCaption && (
//                     <div className="caption">
//                         <h3>Predicted Caption:</h3>
//                         <p>{predictedCaption}</p>
//                     </div>
//                 )}
//             </div>
//             <button onClick={handleSubmit} disabled={!imagePreview || loading}>
//                 Submit Test {selectedTest || ''}
//             </button>
//             {loading && <p>Loading...</p>}
//             {/* Toggle button for AnotherPage */}
//             <button onClick={() => setShowAnotherPage(!showAnotherPage)}>
//                 {showAnotherPage ? 'Show Test Page' : 'Show Another Page'}
//             </button>
            
//             {/* Conditionally render AnotherPage based on showAnotherPage state */}
//             {showAnotherPage && navigate("/testdl")}
//         </div>
//         </>
//     );
// };

// export default TestPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TestPage.css';

const TestPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [originalCaption, setOriginalCaption] = useState('');
    const [predictedCaption, setPredictedCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showAnotherPage, setShowAnotherPage] = useState(false);
    const navigate = useNavigate();

    const predefinedImages = [
        { id: 1, src: process.env.PUBLIC_URL + '/1_IM-0001-4001.dcm.png', originalCaption: 'Original Caption for Test 1' },
        { id: 2, src: process.env.PUBLIC_URL + '/logo512.png', originalCaption: 'Original Caption for Test 2' },
        { id: 3, src: process.env.PUBLIC_URL + '/path_to_test_image_3.jpg', originalCaption: 'Original Caption for Test 3' }
    ];

    const handleImageUpload = (imageSrc, testId) => {
        setImagePreview(imageSrc);
        setSelectedTest(testId);
        setOriginalCaption('');
        setPredictedCaption('');
    };

    const handleSubmit = async () => {
        setLoading(true);
    
        try {
            if (selectedTest !== null) {
                const response = await predictCaption(predefinedImages[selectedTest - 1].src);
                console.log('Response from predictCaption:', response); // Log the entire response to inspect its structure
                
                // Check if 'caption' exists in response.data before destructuring
                if (response && response.caption) {
                    setPredictedCaption(response.caption);
                    setOriginalCaption(predefinedImages[selectedTest - 1].originalCaption);
                } else {
                    console.error('Caption not found in response:', response);
                    // Handle the case where 'caption' is not present in the response
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
    
            // Send POST request to predictllm endpoint
            const predictionResponse = await axios.post('http://localhost:3020/predictllm', formData, {
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
            <h1>Test LLM</h1>
            <div className="button-container">
                {predefinedImages.map((item) => (
                    <button key={item.id} onClick={() => handleImageUpload(item.src, item.id)} className="test-button">
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
                {originalCaption && (
                    <div className="caption">
                        <h3>Original Caption:</h3>
                        <p>{originalCaption}</p>
                    </div>
                )}
                {predictedCaption && (
                    <div className="caption">
                        <h3>Predicted Caption:</h3>
                        <p>{predictedCaption}</p>
                    </div>
                )}
            </div>
            <button onClick={handleSubmit} disabled={!imagePreview || loading}>
                Submit Test {selectedTest || ''}
            </button>
            {loading && <p>Loading...</p>}
            {/* Toggle button for AnotherPage */}
            <button className="toggle-button" onClick={() => setShowAnotherPage(!showAnotherPage)}>
                {showAnotherPage ? 'Show Test Page' : 'Switch To DL'}
            </button>
            
            {/* Conditionally render AnotherPage based on showAnotherPage state */}
            {showAnotherPage && navigate("/testdl")}
        </div>
        </>
    );
};

export default TestPage;
