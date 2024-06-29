const router = require('express').Router()

router.get('/', (req,res) => {
    //todo Get all users
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    //todo Get user by id
})

router.post('/', (req,res) => {
    //toDo Create user
})

router.put('/:id', (req,res) => {
    //toDo update user by id
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    //todo Delete user by id and remove thoughts on delete
})

router.post('/:id/freinds/:freindId', (req,res) => {
    const userId = req.params.id
    const freindId = req.params.freindId
    //todo add freind to users friend lsit
})

router.delete('/:id/freinds/:freindId', (req,res) => {
    const userId = req.params.id
    const freindId = req.params.freindId
    //todo remove user from users freindlist
})

module.exports = router