import multer from "multer";

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

const multerSetup = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/uploads');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    });

    return storage;
}

const fileFilter = (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
          return cb(new Error('file is not allowed'))
        }
    
        cb(null, true)
    }

const uploadImage = {
    single: (file) => {
        const upload = multer({ storage: multerSetup(), fileFilter });
        return upload.single(file);
    },
    multiple: (files) => {
        const upload = multer({ storage: multerSetup(), fileFilter });
        return upload.array(files);
    }
}

export {
    uploadImage,
}