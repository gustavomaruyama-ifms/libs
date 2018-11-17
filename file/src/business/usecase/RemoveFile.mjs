import FileRepository from '../../repository/FileRepository.mjs'

const fileRepository = new FileRepository()

export default class RemoveFile {

    async execute(filename, responder) {
        try {
            const found = await fileRepository.exist(filename)
            if (found) {
                await fileRepository.removeFile(filename)
                responder.success({filename, removed: true})
            } else {
                const err = {message: 'FILE_NOT_FOUND'}
                responder.notFound(err)
            }
        } catch (err) {
            err.message = 'FILE_CORRUPTED'
            responder.error(err)
        }
    }
}
