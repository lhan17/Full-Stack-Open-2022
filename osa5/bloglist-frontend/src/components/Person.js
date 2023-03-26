const Person = ({ person }) => {
    return (
        <div>
            <h2>{person.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {person.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Person
