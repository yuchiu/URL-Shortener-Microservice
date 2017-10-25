const Url = require('../models/Url')

module.exports = {
    emptyUrl(req, res) {
        try {
            res.send({
                err: 'url is empty'
            })
        } catch (err) {
            res.status(500).send({
                error: "error occured fetching empty URL"
            })
        }
    },
    getShortenUrl(req, res) {
        try {
            const {
                urlToShorten
            } = req.params
            const regex = /[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi
            if (regex.test(urlToShorten) === true) {
                const short = Math.floor(Math.random() * 100000).toString()
                const data = new Url({
                    originalUrl: urlToShorten,
                    shortenUrl: "https://shortenURL-yuchiu.herokuapp.com/" + short
                })
                data.save(err => {
                    if (err) {
                        return res.status(500).send({
                            err: 'Error saving to database'
                        })
                    }
                })
                res.send({
                    originalUrl: data.originalUrl,
                    shortenUrl: data.shortenUrl
                })
            } else {
                res.status(400).res.send({
                    err: 'invalid URL'
                })
            }
        } catch (err) {
            return res.status(500).send({
                err: "error occured fetching shorten URL"
            })
        }
    },
    findUrl(req, res) {
        try {
            const {
                forwardUrl
            } = req.params
            Url.findOne({
                'shortenUrl': forwardUrl
            }, (err, data) => {
                if (err) {
                    return res.status(500).send({
                        err: 'Error reading database'
                    })
                }
                if (!data) {
                    return
                }
                const regex = new RegExp("^(http|https)://", "i")
                if (regex.test(data.originalUrl)) {
                    res.redirect(301, data.originalUrl)
                } else {
                    res.redirect(301, 'http://' + data.originalUrl)
                }
            })
        } catch (err) {
            return res.status(500).send('error occured forwarding URL')
        }
    }
}