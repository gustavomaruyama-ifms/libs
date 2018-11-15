import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import FilenameCreator from '../business/entity/FilenameCreator.mjs'

export default class Interceptor {
    static create() {
        const storage = GridFsStorage({
            url: process.env.DB_URL,
            file: (req, file) => {
                const filename = FilenameCreator.createFilename(file.originalname)
                return {filename: filename, metadata: {originalname: file.originalname}}
            }
        })
        return multer({storage: storage, limits: {fileSize: process.env.FILE_MAX_SIZE}}).single('file')
    }
}
