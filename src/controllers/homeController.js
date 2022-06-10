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
let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let user = await CRUDService.getUserById(userId)
        return res.render('editCRUD.ejs', {
            user
        })
    } else {
        return res.send('Not found')
    }
}

let putCURD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)
    return res.render('showCRUD.ejs', {
        data: allUser,
    })
}
module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    showCRUD,
    editCRUD,
    putCURD,
}