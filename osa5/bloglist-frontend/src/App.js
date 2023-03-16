import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [errorMessage, setErrorMessage] = useState(null)
    const [positive, setPositive] = useState(true)

    const blogFormRef = useRef()

    useEffect(() => {
        const fetchdata = async () => {
            let blogs = await blogService.getAll()
            blogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
        }
        fetchdata()
    }, [errorMessage])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage(`wrong username or password`)
            setPositive(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleNewBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        await blogService.create(blog)
        setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
        setPositive(true)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleLike = async (id) => {
        let blog = blogs.find((element) => element.id === id)
        blog.likes++
        console.log(blog)
        await blogService.update(blog)
        setErrorMessage(`blog ${blog.title} by ${blog.author} liked`)
        setPositive(true)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.deleteblog(blog.id)
            setPositive(false)
            setErrorMessage(`blog ${blog.title} deleted`)

            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} positive={positive} />
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

    return (
        <div>
            <Notification message={errorMessage} positive={positive} />
            <h2>blogs</h2>
            <div>
                {user.name} logged in
                <button onClick={handleLogout} id='create'>
                    logout
                </button>
            </div>
            <div></div>
            <Togglable buttonLabel={'create'} ref={blogFormRef}>
                <CreateForm handleNewBlog={handleNewBlog} />
            </Togglable>

            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    user={user}
                />
            ))}
        </div>
    )
}

export default App
