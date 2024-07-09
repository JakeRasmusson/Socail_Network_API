const { Schema, model, SchemaTypes } = require('mongoose')




const thoughSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        type: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'Reaction'
            }
        ]
    }
})

thoughSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

function dateFormat() {
    return this.createdAt.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const Thought = model('Thought', thoughSchema)


module.exports = Thought