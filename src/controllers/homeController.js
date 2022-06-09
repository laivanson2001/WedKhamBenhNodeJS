const db = require("../models")

let getHomePage = async (req, res, next) => {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    })
}

module.exports = {
    getHomePage,

}