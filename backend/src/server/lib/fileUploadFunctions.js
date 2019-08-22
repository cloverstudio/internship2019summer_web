module.exports = {
    checkImageUpload(file) {
        let fileCheck = file || false;
        let imagePath = undefined;

        if (fileCheck) {
            imagePath = `uploads/photos/${file.filename}`;
        }
        return imagePath;
    },
    allFilesCheck(files) {
        let data = {
            images: [],
            files: []
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].mimetype === ('image/png' || 'image/jpg' || 'image/jpeg')) {
                data.images.push(Date.now() + files[i].originalname);
            }
            else if (files[i].mimetype === ('application/pdf' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                data.files.push(Date.now() + files[i].originalname);
            }
            else {
                console.log('file type not supported');
            }
        }
        return data;
    }
}