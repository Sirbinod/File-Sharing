const multer = require("multer");
const path = require("path");
const File = require("../model/file");
// const {v4: uuid4} = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqeName = `${Date.now()}-${Math.random(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqeName);
  },
});

let upload = multer({
  storage,
  limits: {fieldSize: 100000 * 100},
}).single("myfile");

exports.create = (req, res) => {
  // store file
  upload(req, res, async (err) => {
    // validate request
    if (!req.file) {
      return res
        .status(400)
        .json({success: false, error: "all fields are required"});
    }
    if (err) {
      return res.status(500).send({error: err.message});
    }
    //Store inot database
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    console.log(response);
    return res.json({file: `${process.env.APP_BASE}/files/${response.path}`});
  });
};

exports.showFile = async (req, res) => {
  try {
    const _id = req.params.uuid;
    const file = await File.findOne(_id);
    if (!file) {
      res.status(400).json({success: false, message: "Link has been expired."});
    }
    res.status(200).json({
      sucess: true,
      file,
      download: `${process.env.APP_BASE}/file/download${file.filename}`,
      //   file: `{_id:${file._id},filename:${file.filename},path:${file.path},size:${file.size},download:${process.env.APP_BASE}/file/download${file.filename}}`,
    });
  } catch (err) {
    res.status(500).json({err});
    console.log(err);
  }
};

exports.fileDownload = async (req, res) => {
  const _id = req.params.id;
  const file = await File.findOne({_id});

  if (!file) {
    res.status(400).json({success: false, message: "Link has been expired"});
  }
  const filePath = `${__dirname}/../${file.path}`;
  // res.download(filePath);
  res.status(200).json({success: true, filePath});
};
