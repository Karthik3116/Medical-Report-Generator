require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router");
const mongoose = require("mongoose");

const { Readable } = require('stream');

const multer = require('multer');
const axios = require('axios');



app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("working???")
})
// middleware
app.use(express.json());
app.use(cors());
app.use(router);



const PORT = process.env.PORT || 3020;

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    // useUnifiedTopology:true,
    // useNewUrlParser:true
}).then(()=>console.log("Database Connected"))
.catch((error)=>{
    console.log("error",error);
})




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/predictdl', upload.single('file'), async (req, res) => {
    try {
        const formData = new FormData();

        // Convert Buffer to Readable stream
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        // Create Blob from stream
        const blob = new Blob([bufferStream.read()], { type: req.file.mimetype });

        // Now you can append this blob to FormData
        formData.append('file', blob, req.file.originalname);
       
        const response = await axios.post('http://localhost:5000/predictdl', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/predictllm', upload.single('file'), async (req, res) => {
    try {
        const formData = new FormData();

        // Convert Buffer to Readable stream
        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        const blob = new Blob([bufferStream.read()], { type: req.file.mimetype });

        // Now you can append this blob to FormData
        formData.append('file', blob, req.file.originalname);

        
        const response = await axios.post('http://localhost:5000/predictllm', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
