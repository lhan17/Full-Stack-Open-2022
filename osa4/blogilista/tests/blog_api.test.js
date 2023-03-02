const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
require('express-async-errors')

const initialList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 51,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 52,
        __v: 0,
    },
]

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log(1, Blog)
    const blog1 = new Blog(initialList[0])
    const blog2 = new Blog(initialList[1])
    await blog1.save()
    await blog2.save()
})

test('blogs as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})
