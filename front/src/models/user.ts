import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    fullname: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    }
})

const User = models.User || model('User', userSchema)
export default User;