const { Schema, model, SchemaTypes } = require('mongoose')
const Reaction = require('./reaction')
const  User  = require('./user')

function dateFormat(date) {
    return date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}



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
        get: (timeStamp) => dateFormat(timeStamp)
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
},{
    toJSON: {
        getters: true,
        virtuals: true
    }
})

thoughSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

thoughSchema.pre('findOneAndDelete', async function(next) {
    console.log(this.toObject() , 'success')
    const _id = this.getQuery()
    const { username, reactions } = this
    console.log(username, reactions, _id)
    const reactionDelete = await Reaction.deleteMany({_id: { $in: reactions }})
    const userUpdate = await User.findOneAndUpdate({ username }, {
        $pull: {
            thoughts: _id
        }
    })
    console.log(reactionDelete, userUpdate)
    next()

})

const Thought = model('Thought', thoughSchema)


module.exports = Thought