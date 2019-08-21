module.exports = {
    checkImageUpload(file) {
        let fileCheck = file || false;
        let imagePath = undefined;

        if (fileCheck) {
            imagePath = `uploads/photos/${file.filename}`;
        }
        return imagePath
    }
}