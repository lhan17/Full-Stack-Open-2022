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
        user: '640994f2263c644cae8225f2',
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 52,
        user: '640994f2263c644cae8225f2',
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
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaW5oIiwiaWQiOiI2NDA5OTRmMjI2M2M2NDRjYWU4MjI1ZjIiLCJpYXQiOjE2NzgzNDk1NzN9.9t87kkJY9ufAbKuJoVv3Ow9mOhpudFU62wOJUusYNuA'
            )
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
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaW5oIiwiaWQiOiI2NDA5OTRmMjI2M2M2NDRjYWU4MjI1ZjIiLCJpYXQiOjE2NzgzNDk1NzN9.9t87kkJY9ufAbKuJoVv3Ow9mOhpudFU62wOJUusYNuA'
            )
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
        await api
            .post('/api/blogs')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaW5oIiwiaWQiOiI2NDA5OTRmMjI2M2M2NDRjYWU4MjI1ZjIiLCJpYXQiOjE2NzgzNDk1NzN9.9t87kkJY9ufAbKuJoVv3Ow9mOhpudFU62wOJUusYNuA'
            )
            .send(newBlog)
            .expect(400)
    })

    test('adding a blog without url', async () => {
        const newBlog = {
            title: 'How water is a power',
            author: 'Thinh Lam',
        }
        await api
            .post('/api/blogs')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaW5oIiwiaWQiOiI2NDA5OTRmMjI2M2M2NDRjYWU4MjI1ZjIiLCJpYXQiOjE2NzgzNDk1NzN9.9t87kkJY9ufAbKuJoVv3Ow9mOhpudFU62wOJUusYNuA'
            )
            .send(newBlog)
            .expect(400)
    })
})

describe('Delete and put tests', () => {
    test('Delete test', async () => {
        //The blog to delete
        const firstBlog = initialList[0]
        console.log(firstBlog._id)
        await api
            .delete(`/api/blogs/${firstBlog._id}`)
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoaW5oIiwiaWQiOiI2NDA5OTRmMjI2M2M2NDRjYWU4MjI1ZjIiLCJpYXQiOjE2NzgzNDk1NzN9.9t87kkJY9ufAbKuJoVv3Ow9mOhpudFU62wOJUusYNuA'
            )
            .expect(204)
        const blogListAfter = await api.get('/api/blogs')
        expect(blogListAfter.body).toHaveLength(initialList.length - 1)
        const title = blogListAfter.body.map((n) => n.title)
        expect(title).not.toContain(firstBlog.title)
    })

    test('Put test', async () => {
        const updated = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Magical Warrior',
            author: 'Thinh Lam',
            url: 'www.notarealurl.com',
            likes: 23,
        }

        await api.put(`/api/blogs/${updated._id}`).send(updated).expect(204)
        const blogListAfter = await api.get('/api/blogs')
        const title = blogListAfter.body.map((n) => n.title)
        expect(title).toContain(updated.title)
    })

    test('Wrong person posting', async () => {
        const newBlog = {
            title: 'How water is a power',
            author: 'Thinh Lam',
            url: 'http://www.notarealurl.com',
            likes: 5,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
