export default class Responder {
    constructor(req, res, next) {
        this.req = req
        this.res = res
        this.next = next
    }

    success(data) {
        this.res.json(data)
    }

    error(err) {
        this.res.sendStatus(500, err)
    }

    notFound() {
        this.res.sendStatus(404)
    }

    unauthorized() {
        this.res.sendStatus(401)
    }

    fileStream(filedata, filestream) {
        this.res.setHeader('Content-type', filedata.contentType)
        this.res.setHeader('ETag', filedata.filename)
        this.res.setHeader('Cache-Control', 'max-age=86400')
        filestream.pipe(this.res)
    }

    fileDownload(filedata, filestream) {
        this.res.setHeader('Content-disposition', 'attachment; filename=' + filedata.metadata.originalname)
        this.fileStream(filedata, filestream)
    }

}
