import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import ListCountries from './components/listCountries'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [done, isDone] = useState(false)
 

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
        isDone(true)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    const listOfFiltered = countries.filter(country => 
      country.name.common.toLowerCase()
        .includes(event.target.value.toLowerCase()
    ))
    console.log(listOfFiltered)
    setFilteredCountries(listOfFiltered)
  }

  const handleClick = (country) => {
    setFilteredCountries(country)
  } 

  return (
    <div>
      <Filter
        filter={filter}
        handleChange={handleChange}
      />
      {done === true ? 
        <ListCountries 
          countries={filteredCountries}
          handleClick={handleClick}
          />
        :
        <div>Loading countries...</div>
      }
    </div>
  )
}

export default App;
