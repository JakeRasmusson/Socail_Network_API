const router = require('express').Router()
const { User, Thought, Reaction } = require('../../models/index')

router.get('/', async (req,res) => {
    //todo Get all thoughts
    try {
        const thoughts = await Thought.find()
        .populate({ path: 'reactions' })
        res.status(200).json(thoughts)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Retrieving thoughts')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    //todo Get thought by id
    try {
        const thought = await Thought.findById(id)
        .populate({ path: 'reactions' })
        res.status(200).json(thought)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Retrieving thought')
    }
})

router.post('/', async (req, res) => {
    //todo create thought
    try {
        const thought = await Thought.create(req.body)
        const updateUser = await User.findOneAndUpdate({ username: req.body.username}, {
            $addToSet: {
                thoughts: thought._id
            }
        })
        res.json(thought).status(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Creating thought')
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    //todo update thought by id
    try {
        const updatethought = await Thought.findByIdAndUpdate(id, req.body)
        const thought = await Thought.findById(id)
        res.json(thought).status(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error updating thought')
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    //todo delete thought by id
    try {
        const thought = await Thought.findByIdAndDelete(id)
        console.log(thought)
        for (let i = 0; i < thought.reactions.length; i++) {
            const currentReaction = thought.reactions[i]
            const reaction = await Reaction.findByIdAndDelete(currentReaction._id)
        }
        res.status(200).send('Thought Deleted Succesfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error deleting Thought')
    }
})

router.post('/:id/reactions', async (req, res) => {
    //todo create a reaction on a thought by id
    const id = req.params.id
    try {
        const createReaction = await Reaction.create(req.body)
        const updateThought = await Thought.findByIdAndUpdate(id, {
            $addToSet: {
                reactions: createReaction._id
            }
        } )
        console.log(updateThought)
        res.status(200).send('Reaction created succesfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error creating reaction')
    }
})

router.delete('/:id/reactions/:reactionId', async (req,res) => {
    //Todo delete a reaction by id
    const thoughtId = req.params.id
    const reactionId = req.params.reactionId
    try {
        const updateThought = await Thought.findByIdAndUpdate(thoughtId, {
            $pull: {
                reactions: reactionId
            }
        })
        const deleteReaction = await Reaction.findByIdAndDelete(reactionId)
        res.status(200).send('Reaction Deleted succesfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error deleting reaction')
        
    }
})

module.exports = router