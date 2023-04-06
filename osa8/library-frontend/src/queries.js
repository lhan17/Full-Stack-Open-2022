import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query Query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            title
            published
            genres
            author {
                name
                born
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation Mutation(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation Mutation($name: String!, $born: Int!) {
        editAuthor(name: $name, born: $born) {
            name
            born
        }
    }
`

export const LOGIN_USER = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const FAVORITE = gql`
    query Query {
        me {
            favoriteGenre
        }
    }
`

export const FILTEREDBOOKS = gql`
    query Query($genre: String) {
        allBooks(genre: $genre) {
            title
            published
            author {
                name
            }
        }
    }
`
export const BOOK_ADDED = gql`
    subscription Subscription {
        bookAdded {
            title
            published
            genres
        }
    }
`
