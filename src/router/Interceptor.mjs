import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import FilenameCreator from '../business/entity/FilenameCreator.mjs'
import environment from '../common/environment.mjs'

export default class Interceptor {
    static create() {
        const storage = GridFsStorage({
            url: environment.db.url,
            file: (req, file) => {
                const filename = FilenameCreator.createFilename(file.originalname)
                return {filename: filename, metadata: {originalname: file.originalname}}
            }
        })
        return multer({storage: storage, limits: {fileSize: environment.file.maxSize}}).single('file')
    }
}
