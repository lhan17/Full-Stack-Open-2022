const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../model/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
    })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password || password.length < 3) {
        return response.status(400).toJSON({
            error: 'missing username or password or passwordlength too small',
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save().catch((error) => {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
    })

    response.status(200).json(savedUser)
})

module.exports = userRouter
