import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Recommend from './components/Recommend'

const App = () => {
    const authors = useQuery(ALL_AUTHORS)
    const books = useQuery(ALL_BOOKS)
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    if (authors.loading) {
        return <div>loading...</div>
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        navigate('/')
    }

    return (
        <div>
            <div>
                <button onClick={() => navigate('/')}>authors</button>
                <button onClick={() => navigate('/books')}>books</button>
                {token ? (
                    <>
                        <button onClick={() => navigate('/addbook')}>
                            add book
                        </button>{' '}
                        <button onClick={() => navigate('/recommend')}>
                            recommend
                        </button>
                        <button onClick={() => logout()}>logout</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')}>login</button>
                )}
            </div>
            <Routes>
                <Route path='/' element={<Authors authors={authors} />} />
                <Route path='/books' element={<Books books={books} />} />
                <Route path='/addbook' element={<NewBook />} />
                <Route path='/login' element={<Login setToken={setToken} />} />
                <Route
                    path='/recommend'
                    element={<Recommend books={books} />}
                />
            </Routes>
        </div>
    )
}

export default App
