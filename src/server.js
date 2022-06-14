import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWedRoutes from "./route/wed"
import connectDB from "./config/connectDB";

require('dotenv').config()
let app = express()

const cors = require('cors');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWedRoutes(app)

connectDB()

let port = process.env.PORT || 6969
app.listen(port, () => console.log("Backend NodeJS running on port: " + port))