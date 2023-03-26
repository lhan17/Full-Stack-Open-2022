// const BlogContent = ({ blog, handlikes, handleRemove, user }) => {
//     console.log(blog.comment)
//     return (
//         <div>
//             <div>{blog.url}</div>
//             <div>
//                 {blog.likes}
//                 <button onClick={handlikes} className='likebutton'>
//                     like
//                 </button>
//             </div>
//             <div>{blog.user.name}</div>
//             <div>
//                 {user.id === blog.user.id && (
//                     <button onClick={handleRemove}>remove</button>
//                 )}
//             </div>
//             <div>
//                 <h3>comments</h3>
//                 <ul>
//                     {blog.comment.map((b) => (
//                         <li key={b.id}>{b.content}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }

const Blog = ({ blog }) => {
    // const [view, setView] = useState([])

    // const handleView = (id) => {
    //     if (view.includes(id)) {
    //         setView(view.filter((blogId) => blogId !== id))
    //     } else {
    //         setView([...view, id])
    //     }
    // }

    // const handleClick = () => {
    //     handleView(blog.id)
    // }

    // const handlikes = () => {
    //     handleLike(blog.id)
    // }

    // const handleRemove = () => {
    //     handleDelete(blog)
    // }

    return (
        <div>
            {blog.title} {blog.author}
            {/* <button onClick={handleClick}>
                {view.includes(blog.id) ? 'hide' : 'view'}
            </button>
            {view.includes(blog.id) && (
                <BlogContent
                    blog={blog}
                    handlikes={handlikes}
                    handleRemove={handleRemove}
                    user={user}
                />
            )} */}
        </div>
    )
}

export default Blog
