const shortUrl = require('../models/shortUrl')

module.exports = {
    emptyUrl(req, res){
        res.send({
            err: 'url is empty'
        })
    },
    getUrl(req, res) {
        try {
            const {urlToShorten} = req.params
            const regex = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi
            if (regex.test(urlToShorten) === true) {
                const short = Math.floor(Math.random() * 10000).toString()
                const data = new shortUrl({
                    originalUrl: urlToShorten,
                    shortenUrl: short
                })
                data.save(err => {
                    if (err) {
                        res.send('Error saving to database')
                    }
                })
                res.send({
                    data
                })
            } else {
                res.send({
                    err: 'Please enter a proper url'
                })
            }
        } catch(err){
            res.status(500).send({
                error: "error occured"
            })
        }
    }
}