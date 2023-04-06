import { useQuery, useLazyQuery } from '@apollo/client'
import { FAVORITE, FILTEREDBOOKS } from '../queries'

const Recommend = (props) => {
    const favoriteGenre = useQuery(FAVORITE)

    const [getFilteredBooks, { loading: filteredLoading, data: filteredData }] =
        useLazyQuery(FILTEREDBOOKS)

    if (favoriteGenre.loading) {
        return <div>loading...</div>
    }

    const genre = favoriteGenre.data.me.favoriteGenre

    if (!filteredLoading && !filteredData) {
        getFilteredBooks({
            variables: { genre },
        })
    }

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
                    {filteredData?.allBooks.map((a) => (
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
