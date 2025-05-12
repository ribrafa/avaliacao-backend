import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = {
  storage: diskStorage({
    destination: './upload/',
    filename: (req, file, cb) => {
      const fileName = uuidv4() + '_id_' +
        path.parse(file.originalname).name.replace(/\s/g, '') ;

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;