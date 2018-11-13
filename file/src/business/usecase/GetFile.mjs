import FileRepository from '../../repository/FileRepository.mjs'

const fileRepository = new FileRepository()

export default class GetFile {
    constructor(fileController, fileRepository) {
        this.fileController = fileController
        this.fileRepository = fileRepository
    }

    async execute(filename, isAutoDownload, responder) {
        try {
            const found = await fileRepository.exist(filename)
            if (found) {
                const filedata = await fileRepository.getFileData(filename)
                const filestream = fileRepository.getFileStream(filename)
                if (isAutoDownload) {
                    responder.fileDownload(filedata, filestream)
                } else {
                    responder.fileStream(filedata, filestream)
                }
            } else {
                responder.notFound()
            }
        } catch (err) {
            responder.error(err)
        }
    }
}
