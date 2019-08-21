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
            imagesPath: [],
            filesPath: []
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].mimetype === ('image/png' || 'image/jpg' || 'image/jpeg')) {
                data.imagesPath.push(`uploads/photos/${files[i].filename}`);
            }
            else if (files[i].mimetype === ('application/pdf' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                data.filesPath.push(`uploads/files/${files[i].filename}`);
            }
            else {
                console.log('file type not supported');
            }
        }
        return data;
    }
}