const router = require('express').Router()


router.get('/', async (req,res) => {
    //todo Get all reactions
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    //todo Get reaction by id
})


module.exports = router