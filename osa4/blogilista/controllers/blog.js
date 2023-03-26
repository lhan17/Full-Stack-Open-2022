const blogRouter = require('express').Router()
const Blog = require('../model/blog')
const middleware = require('../middleware/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
        .populate('comment', { content: 1 })
    response.json(blogs)
})

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).send('There is no url or title.')
    }
    if (body.likes === undefined) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.delete(
    '/:id',
    middleware.userExtractor,
    async (request, response) => {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (user.id.toString() === blog.user.toString()) {
            console.log('im here')
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'wrong user' })
        }
    }
)

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndUpdate(id, {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: request.body.user.id,
    })
    response.status(204).end()
})

module.exports = blogRouter
