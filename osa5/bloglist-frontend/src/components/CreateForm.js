import { useState } from 'react'
const CreateForm = ({ handleCreate }) => {
    //new blog usestates
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
                    />
                </div>
                <div>
                    author:
                    <input
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
    )
}

export default CreateForm
