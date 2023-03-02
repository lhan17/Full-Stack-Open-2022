const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
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
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Wind Power',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 50,
            __v: 0,
        },
    ]

    const x = {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 52,
        __v: 0,
    }

    test('mostLikes', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(x)
    })
})

describe('mostBlogs', () => {
    const listWithOneBlog = [
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
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Wind Power',
            author: 'Robert C. MartinaaXXXX',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 50,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 51,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Canonical string reduction',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 52,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Wind Power',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 50,
            __v: 0,
        },
    ]

    const x = {
        author: 'Robert C. Martin',
        blogs: 3,
    }

    test('mostBlogs', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(x)
    })
})

describe('mostBlogs', () => {
    const listWithOneBlog = [
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
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Wind Power',
            author: 'Robert C. MartinaaXXXX',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 50,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 51,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Canonical string reduction',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 52,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Wind Power',
            author: 'Robert C. Martin',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 500,
            __v: 0,
        },
    ]

    const x = {
        author: 'Robert C. Martin',
        likes: 603,
    }

    test('mostLikesBlogs', () => {
        const result = listHelper.mostLikesBlogs(listWithOneBlog)
        expect(result).toEqual(x)
    })
})
