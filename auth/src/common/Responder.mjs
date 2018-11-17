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
        err.status = 500
        this.next(err)
    }

    unauthorized() {
        err.status = 401
        this.next(err)
    }
}
