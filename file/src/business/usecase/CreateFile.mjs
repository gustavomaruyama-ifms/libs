import ImageFile from '../entity/ImageFile.mjs'
import FileRepository from '../../repository/FileRepository.mjs'

const fileRepository = new FileRepository()

export default class CreateFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute(originalFileData, responder) {
        try {
            if (ImageFile.isImageFile(originalFileData.contentType)) {
                await this.createThumbnail(originalFileData)
            }
            responder.success(originalFileData)
        } catch (err) {
            err.message = 'CANOT_CREATE_THUMBNAL'
            responder.error(err)
        }
    }

    async createThumbnail(originalFileData) {
        const fileBuffer = await fileRepository.getFileBuffer(originalFileData.filename)
        const thumbnailBuffer = await ImageFile.createThumbnailBuffer(fileBuffer)
        const thumbnailMetadata = await ImageFile.createThumbnailMetadata(originalFileData)
        await fileRepository.saveFile(thumbnailMetadata, thumbnailBuffer)
    }
}
