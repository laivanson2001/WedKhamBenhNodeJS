import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router()

let initWedRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/show-crud', homeController.showCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/put-crud', homeController.putCURD)
    return app.use("/", router)
}

module.exports = initWedRoutes