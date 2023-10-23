const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, userEmail, role) => {
    return jwt.sign(
        {id, userEmail, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res){
        const {userEmail, userPassword, role} = req.body
        if(!userEmail || !userPassword){
            return next(ApiError.badRequest('Некорректный userEmail или пароль'))
        }
        const candidate = await User.findOne({where: {userEmail}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким userEmail уже существует'))
        }
        const hashPassword = await  bcrypt.hash(userPassword, 5)
        const user = await User.create({userEmail, role, userPassword: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.userEmail, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {userEmail, userPassword} = req.body
        const user = await User.findOne({where: {userEmail}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(userPassword, user.userPassword)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.userEmail, user.role )
        return res.json({token})
    }

    async check(req, res, next){
        /*const {id} = req.query
        if(!id){
            return next(ApiError.badRequest('Ne zadan ID'))
        }
        res.json(id)*/
       const token = generateJwt(req.user.id, req.user.userEmail, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()