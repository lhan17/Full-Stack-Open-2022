import { Badge, Divider, List, ListItem, ListItemButton } from '@mui/material'
import CreateForm from './CreateForm'
import Togglable from './Togglable'
import ChatIcon from '@mui/icons-material/Chat'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const Blogs = ({ blogs, blogFormRef, handleNewBlog }) => {
    return (
        <div>
            <Togglable buttonLabel={'create'} ref={blogFormRef}>
                <CreateForm handleNewBlog={handleNewBlog} />
            </Togglable>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                {blogs.map((blog) => (
                    <ListItem
                        key={blog.id}
                        disableGutters
                        secondaryAction={
                            <Badge
                                color='secondary'
                                badgeContent={blog.comment.length}
                            >
                                <ChatIcon />
                            </Badge>
                        }
                    >
                        <ListItemButton
                            component={Link}
                            to={`/blogs/${blog.id}`}
                            sx={{ '&:hover': { bgcolor: 'grey.100' } }}
                        >
                            <Blog blog={blog} s />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
            </List>
        </div>
    )
}

export default Blogs
