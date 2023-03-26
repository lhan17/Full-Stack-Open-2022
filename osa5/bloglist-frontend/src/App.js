/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import {
    addBlog,
    deleteBlog,
    initializeBlogs,
    likeBlog,
} from './reducers/blogReducer'
import { setUser, userLogin } from './reducers/userReducer'
import { Route, Routes, Link, useMatch, useParams } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { AppBar, Button, Container, createTheme, Toolbar } from '@mui/material'

import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Person from './components/Person'
import Users from './components/Users'

const App = () => {
    const padding = {
        paddingRight: 5,
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [user, setUser] = useState(null)

    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)

    const blogFormRef = useRef()
    const user = useSelector((state) => state.user)

    const blogsr = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [notification])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(userLogin(user))
        }
    }, [])

    const data = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])
    // for the person link
    const match = useMatch('/users/:id')
    const person = match ? data.find((p) => p.id === match.params.id) : null

    // for blogs link
    const matchBlog = useMatch('/blogs/:id')
    const blog = matchBlog
        ? blogsr.find((p) => p.id === matchBlog.params.id)
        : null

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            dispatch(userLogin(user))
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(
                setNotification({
                    content: `wrong username or password`,
                    positive: false,
                })
            )
        }
    }

    const handleNewBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        dispatch(addBlog(blog))
        dispatch(
            setNotification({
                content: `a new blog ${blog.title} by ${blog.author} added`,
                positive: true,
            })
        )
    }

    const handleLike = async (id) => {
        console.log(blogsr)
        let blog = blogsr.find((element) => element.id === id)
        console.log(blog)
        dispatch(likeBlog(blog))
        dispatch(
            setNotification({
                content: `blog ${blog.title} by ${blog.author} liked`,
                positive: true,
            })
        )
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
            dispatch(
                setNotification({
                    content: `blog ${blog.title} deleted`,
                    positive: false,
                })
            )
        }
    }

    if (user === null) {
        return (
            <div>
                <Notification
                    message={notification.content}
                    positive={notification.positive}
                />
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type='text'
                            value={username}
                            name='Username'
                            id='loginUsername'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            id='loginPassword'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id='loginButton' type='submit'>
                        login
                    </button>
                </form>
            </div>
        )
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#229954',
            },
            secondary: {
                main: '#85929E',
            },
        },
    })

    return (
        <div>
            <Container>
                <AppBar position='static' theme={theme}>
                    <Toolbar disableGutters>
                        <div>
                            <Button color='inherit'>
                                <Link style={padding} to='/'>
                                    blogs
                                </Link>
                            </Button>
                            <Button color='inherit'>
                                <Link style={padding} to='/users'>
                                    users
                                </Link>
                            </Button>
                            {user.name} logged in
                            <button onClick={handleLogout} id='create'>
                                logout
                            </button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Notification
                    message={notification.content}
                    positive={notification.positive}
                />
                <h2>Blogs app</h2>

                <Routes>
                    <Route
                        path='/users'
                        element={<Users users={data} />}
                    ></Route>
                    <Route
                        path='/'
                        element={
                            <Blogs
                                blogs={blogsr}
                                handleLike={handleLike}
                                handleDelete={handleDelete}
                                user={user}
                                blogFormRef={blogFormRef}
                                handleNewBlog={handleNewBlog}
                            />
                        }
                    ></Route>
                    <Route
                        path='/users/:id'
                        element={<Person person={person} />}
                    ></Route>
                    <Route
                        path='/blogs/:id'
                        element={
                            <BlogView
                                blog={blog}
                                handleLike={handleLike}
                                handleDelete={handleDelete}
                                user={user}
                            />
                        }
                    ></Route>
                </Routes>
            </Container>
        </div>
    )
}

export default App
