import { NO_IMAGE } from "./const.js";

const withImageUrl = (data, prop) => {
    if (data instanceof Array) {
        return data.map((obj) => {
            if (obj[prop]) {
                obj[prop] = `${process.env.IMG_URL}/uploads/${obj[prop]}`;
            } else {
                obj[prop] = `${process.env.IMG_URL}/default/${NO_IMAGE}`;
            }

            return obj;
        });
    } else if (data instanceof Object) {
        if (data[prop]) {
            data[prop] = `${process.env.IMG_URL}/uploads/${data[prop]}`;
        } else {
            data[prop] = `${process.env.IMG_URL}/default/${NO_IMAGE}`;
        }

        return data;
    }
}

export {
    withImageUrl
}