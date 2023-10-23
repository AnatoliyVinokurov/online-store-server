const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
class DeviceController{
    async create(req, res, next){
        try {

            let {deviceName, devicePrice, deviceBrandId, deviceTypeId, deviceAdditionalInfo} = req.body
            const {deviceImageFile} = req.files
            let generatedImageFileName = uuid.v4() + ".jpg"
            deviceImageFile.mv(path.resolve(__dirname, '..', 'static', generatedImageFileName))
            const createdDevice = await Device.create({deviceName, devicePrice, deviceBrandId, deviceTypeId, deviceImageFile: generatedImageFileName})

            if(deviceAdditionalInfo){
                deviceAdditionalInfo = JSON.parse(deviceAdditionalInfo)
                deviceAdditionalInfo.forEach(deviceAdditionalInfoItem =>
                DeviceInfo.create({
                    title: deviceAdditionalInfoItem.title,
                    description: deviceAdditionalInfoItem.description,
                    deviceId: createdDevice.id
                })
                )
            }

            return res.json(createdDevice)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        let{deviceBrandId, deviceTypeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!deviceBrandId && !deviceTypeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (deviceBrandId && !deviceTypeId){
            devices = await Device.findAndCountAll({where:{deviceBrandId}, limit, offset})
        }
        if (!deviceBrandId && deviceTypeId){
            devices = await Device.findAndCountAll({where:{deviceTypeId}, limit, offset})
        }
        if (deviceBrandId && deviceTypeId){
            devices = await Device.findAndCountAll({where:{deviceBrandId, deviceTypeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const{id} = req.params
        const createdDevice = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as:'deviceAdditionalInfo'}]
            }
        )
        return res.json(createdDevice)
    }

}

module.exports = new DeviceController()