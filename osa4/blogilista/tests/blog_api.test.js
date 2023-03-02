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
beforeEach(async () => {
    await Blog.deleteMany({})
    const blog1 = new Blog(initialList[0])
    const blog2 = new Blog(initialList[1])
    await blog1.save()
    await blog2.save()
})

const api = supertest(app)
describe('Initial tests', () => {
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
})

describe('new blogs and defined ids', () => {
    test('ids of the blogs are defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response._id).toBeDefined
    })

    test('adding new blogs to the list', async () => {
        const newBlog = {
            title: 'How water is a power',
            author: 'Thinh Lam',
            url: 'http://www.notarealurl.com',
            likes: 5,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialList.length + 1)
    })
})

describe('adding without a specific variable', () => {
    test('adding a blog without likes variable', async () => {
        const newBlog = {
            title: 'How water is a power',
            author: 'Thinh Lam',
            url: 'http://www.notarealurl.com',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        console.log(response.body[response.body.length - 1])
        expect(response.body[response.body.length - 1].likes).toBe(0)
    })

    test('adding a blog without title', async () => {
        const newBlog = {
            author: 'Thinh Lam',
            url: 'http://www.notarealurl.com',
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('adding a blog without url', async () => {
        const newBlog = {
            title: 'How water is a power',
            author: 'Thinh Lam',
        }
        await api.post('/api/blogs').send(newBlog).expect(400)
    })
})

describe('Delete and put tests', () => {
    test('Delete tests', async () => {})
})

afterAll(async () => {
    await mongoose.connection.close()
})