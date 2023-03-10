import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    //new blog usestates
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [positive, setPositive] = useState(true)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [author])

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

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const blog = {
                title: title,
                author: author,
                url: url,
            }
            await blogService.create(blog)
            setErrorMessage(`a new blog ${title} by ${author} added`)
            setPositive(true)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {}
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
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>login</button>
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
                <button onClick={handleLogout}>logout</button>
            </div>
            <div></div>
            <div>
                <h2>create new</h2>
                <form onSubmit={handleCreate}>
                    <div>
                        title:
                        <input
                            type='title'
                            value={title}
                            name='Title'
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:
                        <input
                            type='author'
                            value={author}
                            name='Author'
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:
                        <input
                            value={url}
                            name='Url'
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button type='submit'>create</button>
                </form>
            </div>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
