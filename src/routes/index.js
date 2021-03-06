const URLController = require('../controllers/URLController')
module.exports = (app) => {
    app.get('/',
        function (req, res) {
            res.render("index")
        }
    )
    app.get('/new', URLController.emptyUrl)
    app.get('/new/:urlToShorten(*)', URLController.getShortenUrl)
    app.get('/:forwardUrl', URLController.findUrl)
}