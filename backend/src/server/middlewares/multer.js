const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.join(__dirname, '../../../../../uploads/photos') }, );

module.exports = upload;