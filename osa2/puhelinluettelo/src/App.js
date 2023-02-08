import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from "./services/persons"
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }


    // Same person adding
    if (persons.find(p => p.name === newName)) {
      const person1 = persons.find(p => p.name === newName)
      const personObject1 = {
        name: newName,
        number: newNumber,
        id: person1.id
      }
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(person1.id, personObject)
          .then(p => {
            setPersons(persons.map(p => p.id !== person1.id ? p : personObject1))
            setNewName("")
            setNewNumber("")
            setErrorMessage(`Updated ${p.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }

      return console.log("Nothing happened")
    }
    //Person adding
    personService
      .create(personObject)
      .then(p => {
        setPersons(persons.concat(p))
        setNewName("")
        setNewNumber("")
        setErrorMessage(`Added ${p.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App