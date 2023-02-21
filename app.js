require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000
const mongoose = require('mongoose');
const cors = require('cors');
const notFound = require('./middleware/notFound');
const teamRouter = require('./routes/teamRouter.js')
mongoose.set('strictQuery', true);


app.use(cors());
app.use(express.json());    


app.use(teamRouter);


app.use(notFound);




const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`srver running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error)
    };
};

start();
