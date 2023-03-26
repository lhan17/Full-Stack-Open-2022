import { Badge, Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { pink } from '@mui/material/colors'

const BlogView = ({ blog, handleLike, handleDelete, user }) => {
    if (!blog) return null
    const handlike = () => {
        handleLike(blog.id)
    }
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const handleRemove = () => {
        handleDelete(blog)
    }

    const handleComment = async (event, id) => {
        event.preventDefault()
        await axios.post(`/api/blogs/${id}/comments`, {
            content: comment,
        })
        dispatch(
            setNotification({
                content: `you just commented on ${blog.title}`,
                positive: true,
            })
        )
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <Box
                sx={{
                    '& > :not(style)': {
                        m: 2,
                    },
                }}
            >
                <Badge color='primary' badgeContent={blog.likes}>
                    <FavoriteIcon sx={{ color: pink[500] }} />
                </Badge>{' '}
                <button onClick={handlike}>like</button>
            </Box>{' '}
            <p>added by {blog.user.name}</p>
            {user.id === blog.user.id && (
                <button onClick={handleRemove}>remove</button>
            )}
            <div>
                <h3>comments</h3>
                <div>
                    <form onSubmit={(event) => handleComment(event, blog.id)}>
                        <div>
                            <TextField
                                id='comment-input'
                                label='Comment'
                                variant='standard'
                                value={comment}
                                name='comment'
                                onChange={({ target }) =>
                                    setComment(target.value)
                                }
                            />
                            <Button type='submit' variant='outlined'>
                                comment
                            </Button>
                        </div>
                    </form>
                </div>
                <ul>
                    {blog.comment.map((b) => (
                        <li key={b.id}>{b.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BlogView
