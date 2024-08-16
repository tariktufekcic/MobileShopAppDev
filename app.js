const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require('./routers/main');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);


app.get("/health", async (req, res) => {
    try {
        res.send("Server is working.")   
    } catch (e) {
        console.error("Error")
    }
});


const connectToMongoose = async () => {
    try {
        await mongoose.connect("mongodb+srv://trktfkcc:PowQB3pqWtdmsKxW@cluster1.3qezmjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");
        console.log("--Connected to DB--");
        serverStart();
    } catch (e) {
        console.error("db error")
    }  
};

const serverStart = () => {
app.listen(8080, () => {
    console.log("Server is running...")
})
};

connectToMongoose();