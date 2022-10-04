import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filtered, setFiltered] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(e => e.name === newName)

    if (exists) {
      window.alert(`${newName} is already in phonebook`)
    } else { 
      const personObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personObject))
      setFiltered(filtered.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
    const filterItems = persons.filter(person => 
      person.name.toLowerCase()
        .includes(filter.toLowerCase()
    ))
    setFiltered(filterItems)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with
        <input 
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )

}

export default App
