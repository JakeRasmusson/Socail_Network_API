const router = require('express').Router()

router.get('/', (req,res) => {
    //todo Get all thoughts
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    //todo Get thought by id
})

router.post('/', (req, res) => {
    //todo create thought
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    //todo update thought by id
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    //todo delete thought by id
})

router.post('/:id/reactions', (req, res) => {
    //todo create a reaction on a thought by id
})

router.delete('/:id/reactions/:reactionId', (req,res) => {
    //Todo delete a reaction by id
})

module.exports = router