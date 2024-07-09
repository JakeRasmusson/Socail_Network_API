const router = require('express').Router()

router.get('/', async (req,res) => {
    //todo Get all thoughts
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    //todo Get thought by id
})

router.post('/', async (req, res) => {
    //todo create thought
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    //todo update thought by id
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    //todo delete thought by id
})

router.post('/:id/reactions', async (req, res) => {
    //todo create a reaction on a thought by id
})

router.delete('/:id/reactions/:reactionId', async (req,res) => {
    //Todo delete a reaction by id
})

module.exports = router