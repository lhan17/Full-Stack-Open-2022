import { useState } from 'react'

const Books = (props) => {
    const [filter, setFilter] = useState(null)
    const [genreButton, setGenreButton] = useState([])

    if (props.books.loading) {
        return <div>loading...</div>
    }

    const books = props.books.data.allBooks

    books.forEach((element) => {
        element.genres.forEach((gen) => {
            if (!genreButton.includes(gen)) {
                setGenreButton(genreButton.concat(gen))
            }
        })
    })

    const filteredBooks = filter
        ? books.filter((element) => element.genres.includes(filter))
        : books

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {genreButton.map((element) => (
                <button key={element} onClick={() => setFilter(`${element}`)}>
                    {element}
                </button>
            ))}{' '}
            <button onClick={() => setFilter(null)}>all genre</button>
        </div>
    )
}

export default Books
