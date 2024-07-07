// import React, { useState } from 'react';
// import axios from 'axios';
// import "./Dashboard.css"; 

// function Llm() {
//     const [image, setImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [caption, setCaption] = useState('');

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setImagePreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = async () => {
//         const formData = new FormData();
//         formData.append('file', image);

//         try {
//             const response = await axios.post('http://localhost:3020/predictllm', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setCaption(response.data.caption);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>LLM</h1>
//             <input type="file" onChange={handleImageUpload} />
//             {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', height: 'auto' }} />}
//             <button onClick={handleSubmit}>Submit</button>
//             {caption && <p>{caption}</p>}
//         </div>
//     );
// }

// export default Llm;


import React, { useState } from 'react';
import axios from 'axios';
import "./Dashboard.css"; 

function Llm() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
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
        }
    };

    return (
        <div>
            <h1>LLM</h1>
            <input type="file" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', height: 'auto' }} />}
            <button onClick={handleSubmit}>Submit</button>
            {caption && <p>{caption}</p>}
        </div>
    );
}

export default Llm;
