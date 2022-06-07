import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWedRoutes from "./route/wed"
require('dotenv').config()
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWedRoutes(app)

let port = process.env.PORT || 6969
app.listen(port, () => console.log("Backend NodeJS running on port: " + port))