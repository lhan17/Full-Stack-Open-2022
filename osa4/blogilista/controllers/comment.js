const commentRouter = require('express').Router()
const { response } = require('express')
const Comment = require('../model/comment')
const Blog = require('../model/blog')

commentRouter.get('/blogs/:id/comments', async (request, response) => {
    const comments = await Comment.find({ blog: request.params.id }).populate(
        'blog'
    )
    response.json(comments)
})

commentRouter.get('/comments', async (request, response) => {
    const comments = await Comment.find({}).populate('blog')
    response.json(comments)
})

commentRouter.post('/blogs/:id/comments', async (request, response) => {
    const body = request.body
    const blogid = request.params.id

    const blog = await Blog.findById(blogid)

    const comment = new Comment({
        content: body.content,
        blog: blogid,
    })

    const savedComment = await comment.save()

    blog.comment = blog.comment.concat(savedComment)
    await blog.save()

    response.json(savedComment)
})

module.exports = commentRouter
