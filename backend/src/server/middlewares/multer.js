const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === ('image/png' || 'image/jpg' || 'image/jpeg')) {
        cb(null, path.join(__dirname, '../../../../../public/uploads/photos'))
        } else if (file.mimetype === ('application/pdf' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        cb(null, path.join(__dirname, '../../../../../public/uploads/files'))
        } else {
        cb({ error: 'file type not supported' })
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      }
})
  
const upload = multer({ storage: storage })

module.exports = upload;