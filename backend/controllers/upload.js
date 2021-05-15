const multer = require('multer')
const uuid = require('uuid').v4;

const MIME_TYPE_MAP = {
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
  };

const filter = (req, file, cb) => {
     if (file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    } else {
        cb("Please upload only .docx files.", false);
    }
}

const fileStorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads')
    },

    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + '.' + ext)
    }

})

const upload = multer({ storage: fileStorageEngine, fileFilter: filter })

module.exports = upload;