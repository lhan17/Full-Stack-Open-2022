import { useState } from 'react'

const BlogContent = ({ blog, handlikes, handleRemove, user }) => {
    return (
        <div>
            <div>{blog.url}</div>
            <div>
                {blog.likes}
                <button onClick={handlikes} className='likebutton'>
                    like
                </button>
            </div>
            <div>{blog.user.name}</div>
            <div>
                {user.id === blog.user.id && (
                    <button onClick={handleRemove}>remove</button>
                )}
            </div>
        </div>
    )
}

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const [view, setView] = useState([])

    const handleView = (id) => {
        if (view.includes(id)) {
            setView(view.filter((blogId) => blogId !== id))
        } else {
            setView([...view, id])
        }
    }

    const handleClick = () => {
        handleView(blog.id)
    }

    const handlikes = () => {
        handleLike(blog.id)
    }

    const handleRemove = () => {
        handleDelete(blog)
    }

    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <button onClick={handleClick}>
                {view.includes(blog.id) ? 'hide' : 'view'}
            </button>
            {view.includes(blog.id) && (
                <BlogContent
                    blog={blog}
                    handlikes={handlikes}
                    handleRemove={handleRemove}
                    user={user}
                />
            )}
        </div>
    )
}

export default Blog
