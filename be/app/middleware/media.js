const multer = require('multer')
const path = require('path')

exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(__dirname, '../uploads');
            cb(null, uploadPath) 
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).single("image");

