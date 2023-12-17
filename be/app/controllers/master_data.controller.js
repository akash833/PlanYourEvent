const { createMasterData, geteMasterData } = require('../services/master_data.service');

exports.create = async (req, res) => {
    try {
        const create = await createMasterData(req.body);
        res.json({data: create, status: 'success'}); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const getAllMasterData = await geteMasterData(req.body);
        res.json({data: getAllMasterData, status: 'success'}); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}