const { Schema, model, SchemaTypes } = require('mongoose')


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId
    },
    reactionBody: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat
    }
})

function dateFormat() {
    return this.createdAt.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}



const Reaction = model('Reaction', reactionSchema)


module.exports = Reaction