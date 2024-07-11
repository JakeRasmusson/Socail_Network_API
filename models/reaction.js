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
},{
    toJSON: {
        getters: true
    }
})

function dateFormat(date) {
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}



const Reaction = model('Reaction', reactionSchema)


module.exports = Reaction