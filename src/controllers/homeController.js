let getHomePage = (req, res, next) => {
    return res.send("Hello world from the home page")
}

module.exports = {
    getHomePage,

}