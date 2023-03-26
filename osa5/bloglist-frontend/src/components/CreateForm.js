import { Button, InputLabel, TextField } from '@mui/material'
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
                    <InputLabel htmlFor='title-input'>Title</InputLabel>
                    <TextField
                        value={title}
                        name='title'
                        onChange={({ target }) => setTitle(target.value)}
                        id='title-input'
                        variant='standard'
                    />
                </div>
                <div>
                    <InputLabel htmlFor='author-input'>Author</InputLabel>
                    <TextField
                        value={author}
                        name='author'
                        onChange={({ target }) => setAuthor(target.value)}
                        id='author-input'
                        variant='standard'
                    />
                </div>
                <div>
                    <InputLabel htmlFor='url-input'>URL</InputLabel>
                    <TextField
                        value={url}
                        name='url'
                        onChange={({ target }) => setUrl(target.value)}
                        id='url-input'
                        variant='standard'
                    />
                </div>
                <Button type='submit' variant='text' color='primary'>
                    Create
                </Button>
            </form>
        </div>
    )
}

export default CreateForm
