import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFiltered(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(e => e.name === newName)

    if (exists) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const changedNum = { ...exists, number: newNumber}

        personService
          .update(exists.id, changedNum)
          .then(returnedPerson => {
            const newPerson = persons.map(person => person.name !== newName ? person : returnedPerson)
            setFiltered(newPerson)
            setPersons(newPerson)        
            setNotification(`${newName}'s number was changed`)

          })
          .catch(e => {
            setError(`${newName} has been removed already`)
            
            const updatedPersons = persons
              .filter(person => person.id !== exists.id)
            setPersons(updatedPersons)
            setFiltered(updatedPersons)
          })
      }
    } else { 
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .add(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFiltered(filtered.concat(returnedPerson))
          setNotification(`${returnedPerson.name} was added`)
        })
    }
    setTimeout(() => {
      setNotification(null)
      setError(null)
    }, 5000)

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

  const deleteNum = (id, name) => {
    if(window.confirm(`delete ${name}`)) {      
      personService
        .deleteNum(id)
        .then(response => {
          console.log(response)
        })

      const updatedPersons = persons
        .filter(person => person.id !== id)
      setPersons(updatedPersons)
      setFiltered(updatedPersons)
      setNotification(`${name} was deleted`)

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} isError={true} />
      <Notification message={notification} />
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
      <Numbers filtered={filtered} deleteNum={deleteNum}/>
    </div>
  )
}

export default App
