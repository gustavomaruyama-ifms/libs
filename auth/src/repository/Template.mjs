import mongoose from 'mongoose'

const TemplateSchema = new mongoose.Schema({
    name:  {type: String, required: true, unique: true},
    subject: {type: String, required: false},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export const Template = mongoose.model('Template', TemplateSchema)
