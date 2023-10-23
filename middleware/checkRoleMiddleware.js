const jsonWebToken = require('jsonwebtoken')


module.exports = function(requiredUserRole) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const extractedAuthToken = req.headers.authorization.split(' ')[1]
            if (!extractedAuthToken) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decodedAuthToken = jsonWebToken.verify(extractedAuthToken, process.env.SECRET_KEY)
           if(decodedAuthToken.requiredUserRole !== requiredUserRole){
               return res.status(403).json({message: "Нет доступа"})
           }
            req.currentUser = decodedAuthToken
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}

