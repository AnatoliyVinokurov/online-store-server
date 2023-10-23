const {Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController{
    async create(req, res){
        const {brandName} = req.body
        const createdBrand = await Brand.create({brandName})
        return res.json(createdBrand)
    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()