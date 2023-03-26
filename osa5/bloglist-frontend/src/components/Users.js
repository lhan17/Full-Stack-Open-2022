import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <Link to={`/users/${row.id}`}>{row.name}</Link>
                            </td>
                            <td>{row.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Users
