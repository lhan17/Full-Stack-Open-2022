import { useState } from 'react'

const CreateForm = ({ handleNewBlog }) => {
    //new blog usestates
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = (blog) => {
        try {
            handleNewBlog(blog)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            console.error(exception)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreate({
            title: title,
            author: author,
            url: url,
        })
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                        id='title-input'
                    />
                </div>
                <div>
                    author:
                    <input
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                        id='author-input'
                    />
                </div>
                <div>
                    url:
                    <input
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                        id='url-input'
                    />
                </div>
                <button type='submit' id='createButton'>
                    create
                </button>
            </form>
        </div>
    )
}

export default CreateForm
