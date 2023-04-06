const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/users')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author')
            if (!args.author && !args.genre) {
                return books
            }

            let filteredBooks = await Book.find({}).populate('author')
            if (args.author) {
                filteredBooks = filteredBooks.filter(
                    (book) => book.author.name === args.author
                )
            }
            if (args.genre) {
                filteredBooks = filteredBooks.filter((book) =>
                    book.genres.includes(args.genre)
                )
            }
            return filteredBooks
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        },
    },

    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            if (!author) {
                return 0
            }
            const books = await Book.find({ author: author._id })
            return books.length
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.name })
                author = await author.save()
            }
            const book = new Book({
                title: args.title,
                author: author._id,
                published: args.published,
                genres: args.genres,
            })
            try {
                await book.save()
                pubsub.publish('BOOK_ADDED', { bookAdded: book })
                return book
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error: error.message,
                    },
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            await author.save()
            return author
        },
        addAuthor: async (root, args) => {
            const author = new Author({ name: args.name, born: args.born })
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers
