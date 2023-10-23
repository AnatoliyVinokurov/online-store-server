const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController{
    async create(req, res){
        const {typeName} = req.body
        const createdType = await Type.create({typeName})
        return res.json(createdType)
    }

    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }

}

module.exports = new TypeController()