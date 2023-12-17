const express = require("express")
const router = express.Router()
const { upload } = require("../middleware/media");

router.post("/image", upload, (req, res) => {
    let baseUrl = process.env.BASE_URL
    res.send({ msg: "File Uploaded", url: baseUrl + req.file.filename });
});

module.exports = router