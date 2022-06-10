const db = require("../models")
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res, next) => {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    })
}
let getCRUD = (req, res, next) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res, next) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('postCRUD');
}
let showCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('showCRUD.ejs', {
        data,
    })
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    showCRUD,
}