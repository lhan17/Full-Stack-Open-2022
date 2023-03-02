const blogRouter = require('express').Router()
const Blog = require('../model/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if (request.body.title === undefined || request.body.url === undefined) {
        return response.status(400).send('There is no url or title.')
    }

    if (request.body.likes === undefined) {
        request.body.likes = 0
    }
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter
