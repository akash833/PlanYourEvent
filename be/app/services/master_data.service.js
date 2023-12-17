const MasterDataModel = require('../models/master_data.model');

exports.createMasterData = async(master_data) => {
    return await MasterDataModel.create(master_data)
}


exports.geteMasterData = async() => {
    return await MasterDataModel.find({})
}