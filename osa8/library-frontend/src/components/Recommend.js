import { useQuery } from '@apollo/client'
import { FAVORITE } from '../queries'

const Recommend = (props) => {
    const favoriteGenre = useQuery(FAVORITE)
    if (props.books.loading || favoriteGenre.loading) {
        return <div>loading...</div>
    }

    const books = props.books.data.allBooks

    const filteredBooks = books.filter((element) =>
        element.genres.includes(favoriteGenre.data.me.favoriteGenre)
    )

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
        </div>
    )
}

export default Recommend
