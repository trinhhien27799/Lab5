var express = require('express');
var router = express.Router();
var multer = require('multer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },

  // Rename the file + Take the realtime & random number
  filename: (req, file, cb) => {
    cb(null, Date.now() + " --- " + Math.random() + " --- " + file.originalname.replace(/\.png$/, '.jpg'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
});

var storageUpload = upload.array('avatar', 5);

// Upload multiple files
router.post('/insert', storageUpload ,(req, res) => {
  const img = req.files;
  res.end('Upload successful');
})

module.exports = router;
