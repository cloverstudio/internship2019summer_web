const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === ('image/png' || 'image/jpg' || 'image/jpeg')) {
        cb(null, path.join(__dirname, '../../../../../uploads/photos'))
        } else if (file.mimetype === ('application/pdf' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        cb(null, path.join(__dirname, '../../../../../uploads/files'))
        } else {
        console.log(file.mimetype)
        cb({ error: 'file type not supported' })
        }
    }
})
  
const upload = multer({ storage: storage })

module.exports = upload;