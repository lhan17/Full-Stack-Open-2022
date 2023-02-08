const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} /> <br></br>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm