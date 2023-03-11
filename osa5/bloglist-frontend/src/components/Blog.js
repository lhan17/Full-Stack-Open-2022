import { useState } from 'react'

const Blog = ({ blog }) => {
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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={handleClick}>
                    {view.includes(blog.id) ? 'hide' : 'view'}
                </button>
                {view.includes(blog.id) && (
                    <div>
                        <div>{blog.url}</div>
                        <div>{blog.likes}</div>
                        <div>{blog.user.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blog
