import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    source: {type: String, required: true, default: 'internal'},
    fullname:  {type: String, required: false},
    photo:  {type: String, required: false},
    password: {type: String, required: false, select: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export const User = mongoose.model('User', UserSchema)
