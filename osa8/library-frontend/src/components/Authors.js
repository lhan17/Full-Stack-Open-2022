import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
const Authors = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    if (props.authors.loading) {
        return <div>loading...</div>
    }
    const authors = props.authors.data.allAuthors
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        const bornU = Number(born)
        updateAuthor({ variables: { name, born: bornU } })

        setName('')
        setBorn('')
    }

    const authorName = authors.map((a) => a.name)

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h3>Set birthyear</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        name
                        <select
                            onChange={(event) => setName(event.target.value)}
                        >
                            {authorName.map((a) => (
                                <option key={a} value={a}>
                                    {a}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        born
                        <input
                            value={born}
                            onChange={({ target }) => setBorn(target.value)}
                        />
                    </div>
                    <button type='submit'>update author</button>
                </form>
            </div>
        </div>
    )
}

export default Authors
