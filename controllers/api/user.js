const router = require('express').Router()
const { User, Thought } = require('../../models/index')

router.get('/',  async (req,res) =>  {
    //todo Get all users
    try {
        const users = await User.find()
        .populate({ path: 'thoughts' })
        .populate({ path: 'friends' })
        res.json(users).status(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Retrieving users')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const users = await User.findById(id)
        .populate({ path: 'thoughts' })
        .populate({ path: 'friends' })
        res.json(users).status(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Retrieving users')
    }
})

router.post('/', async (req,res) => {
    try {
        const user = await User.create(req.body)
        res.json(user).status(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error Creating user')
    }
    
})

router.put('/:id', async (req,res) => {
    //toDo update user by id
    const id = req.params.id
    try {
        const users = await User.findByIdAndUpdate(id, req.body)
        res.status(200).send('User Updated Succesfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error updating user')
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id)
        console.log(user)
        for (let i = 0; i < user.thoughts.length; i++) {
            const currentThought = user.thoughts[i]
            const thought = await Thought.findByIdAndDelete(currentThought._id)
        }
        res.status(200).send('User Deleted Succesfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error deleting user')
    }
    //todo Delete user by id and remove thoughts on delete
})

router.put('/:id/friends/:friendId', async (req,res) => {
    const userId = req.params.id
    const friendId = req.params.friendId
    console.log(friendId)
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $addToSet: {
                friends: friendId
            }
        })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error adding friend')
    }
    //todo add freind to users friend lsit
})

router.delete('/:id/friends/:friendId', async (req,res) => {
    //todo remove user from users freindlist
    const userId = req.params.id
    const friendId = req.params.friendId
    console.log(friendId)
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                friends: friendId
            }
        })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Error adding friend')
    }
})

module.exports = router