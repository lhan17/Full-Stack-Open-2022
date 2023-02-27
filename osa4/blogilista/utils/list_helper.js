/* eslint-disable no-unused-vars */
const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach((element) => {
        total += element.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let blog = undefined
    let likes = 0
    blogs.forEach((element) => {
        if (element.likes > likes) {
            blog = element
            likes = element.likes
        }
    })

    return blog
}

const mostBlogs = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author')
    const authorCounts = _.map(groupedBlogs, (blogs, author) => {
        return {
            author,
            count: blogs.length,
        }
    })
    const sortedAuthorCounts = _.orderBy(authorCounts, 'count', 'desc')
    const mostProlificAuthor = sortedAuthorCounts[0]
    const authorName = mostProlificAuthor.author
    const blogCount = mostProlificAuthor.count
    return { author: authorName, blogs: blogCount }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
