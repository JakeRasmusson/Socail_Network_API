const router = require('express').Router()


router.get('/', (req,res) => {
    //todo Get all reactions
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    //todo Get reaction by id
})


module.exports = router