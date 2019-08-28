module.exports = {
    checkImageUpload(file) {
        let fileCheck = file || false;
        let image = undefined;

        if (fileCheck) {
            image = file.filename;
        }
        return image;
    },
    allFilesCheck(files) {
        let data = {
            images: [],
            files: []
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].mimetype === 'image/png' || files[i].mimetype === 'image/jpg' || files[i].mimetype === 'image/jpeg') {
                data.images.push(Date.now() + files[i].originalname);
            }
            else if (files[i].mimetype === 'application/pdf' || files[i].mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {

                data.files.push(Date.now() + files[i].originalname);
            }
            else {
                console.log('file type not supported');
            }
        }
        return data;
    }
}