const router = require("express").Router();
const {create, showFile, fileDownload} = require("../controller/fileshare");

// Router
router.post("/file", create);
router.get("/file/:id", showFile);
router.get("/file/download/:id", fileDownload);

module.exports = router;
