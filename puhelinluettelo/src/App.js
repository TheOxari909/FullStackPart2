import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

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

      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })
      
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
      <Filter newFilter={newFilter} handleChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers filtered={filtered} />
    </div>
  )

}

export default App
