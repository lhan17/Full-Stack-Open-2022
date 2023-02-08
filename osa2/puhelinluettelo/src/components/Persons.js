import personService from "../services/persons"

const Person = ({ person }) => {
    return (
        <div>{person.name} {person.number}</div>
    )
}

const Persons = ({ personsToShow, setPersons, persons, setErrorMessage }) => {
    return (
        <div>
            {personsToShow.map(p => (
                <div key={p.name}>
                    <Person person={p} />
                    <button onClick={() => {
                        if (window.confirm(`Delete ${p.name}?`)) {
                            personService.deleted(p.id)
                                .then(() => {
                                    setPersons(persons.filter(pe => pe.id !== p.id))
                                    setErrorMessage(`deleted ${p.name}`)
                                    setTimeout(() => {
                                        setErrorMessage(null)
                                    }, 5000)
                                })
                                .catch(error => {
                                    setErrorMessage(`Information of ${p.name} has already been removed from the server`)
                                    setTimeout(() => {
                                        setErrorMessage(null)
                                    }, 5000)
                                })
                        }
                    }}>delete</button>
                </div>
            ))}
        </div>
    )
}

export default Persons