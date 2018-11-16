import {Template} from './Template.mjs'

class TemplateRepository {
    async findByName(name) {
        return Template.findOne({name: name})
    }
}

export default new TemplateRepository()
