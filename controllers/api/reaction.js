const router = require('express').Router()
const { Reaction } = require('../../models/index')

router.get('/', async (req,res) => {
    //todo Get all reactions
    try {
        const reactions = await Reaction.find()
        res.status(200).json(reactions)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error retrieving reactions')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    //todo Get reaction by id
    try {
        const reaction = await Reaction.findById(id)
        res.status(200).json(reaction)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error retrieving reactions')
    }
})


module.exports = router