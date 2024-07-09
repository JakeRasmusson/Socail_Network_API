const { Schema, model, SchemaTypes } = require('mongoose')


const validateEmail = (input) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(input)
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: 'Email validation failed'
        }
    },
    thoughts: {
        type: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    friends: {
        type: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'User'
            }
        ]
    }
})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})


const User = model('User', userSchema)


module.exports = User