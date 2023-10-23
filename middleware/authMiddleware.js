const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const extractedAuthToken = req.headers.authorization.split(' ')[1]
        if(!extractedAuthToken){
            return res.status(401).json({message:"Не авторизован"})
        }
        const decodedAuthToken = jwt.verify(extractedAuthToken, process.env.SECRET_KEY)
        req.currentUser = decodedAuthToken
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}