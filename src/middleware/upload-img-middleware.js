import multer from "multer";
import crypto from 'crypto';

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
            const random = crypto.randomBytes(8).toString('hex');
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];

            cb(null, `${Date.now()}_${random}.${extension}`);
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
    multiple: (files = []) => {
        const upload = multer({ storage: multerSetup() });
        const fields = []
        files.forEach(element => {
            fields.push({
                name: element
            })
        });
        return upload.fields(fields)
    }
}

export {
    uploadImage,
}