const mongooseConnection = require('../config/connection')
const {User, Thought, Reaction} = require('../models/index')
const userSeeds = require('./user.json')
const reactionSeeds = require('./reaction.json')
const thoughtSeeds = require('./thought.json')

mongooseConnection.once('connected', async () => {
    await User.deleteMany()
    await Thought.deleteMany()
    await Reaction.deleteMany()

    const seededReactions = await Reaction.insertMany(reactionSeeds)
    console.log('Reactions Seeded!')

    const seededThoughts = await Thought.insertMany(thoughtSeeds)
    console.log('Thoughts Seeded!')

    const seededUsers = await User.insertMany(userSeeds)
    console.log('Users Seeded!')

    for (let i = 0; i < seededThoughts.length; i++) {
        const currentThought = seededThoughts[i]
        const currentReaction = seededReactions[i]
        const thoughts = await Thought.findOneAndUpdate(currentThought._id, 
            { reactions: currentReaction._id }
            
        )
    }

    for (let i = 0; i < seededUsers.length; i++) {
        const currentUser = seededUsers[i]
        const currentThought = seededThoughts[i]
        const randomUserIndex = Math.floor(Math.random() * seededUsers.length)
        const randomUser = seededUsers[randomUserIndex]
        const users = await User.findOneAndUpdate(currentUser._id,
            {
                thoughts: currentThought._id,
                friends: randomUser._id
            }
        )
    }



    process.exit(0)
})