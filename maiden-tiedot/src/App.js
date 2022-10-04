import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleChange }) => (
  <div>
    search for country&nbsp;
    <input 
      value={filter}
      onChange={handleChange}
    />
  </div>
)

const DetailedCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {Object.keys(country.languages)
          .map(e => (
            <li key={e}>{country.languages[e]}</li>
        ))}
      </ul>
      <img height="150px" alt="flag" src={country.flags.png}/>
    </div>
  )
}

const ListCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length > 1){
    return (
    <div>
      {countries.map((country) => (
      <div key={country.name.common} country={country}>
        {country.name.common}
      </div>
      ))}
    </div>
    )
  }
  else if (countries.length === 1) {
    return (
      <DetailedCountry country={countries[0]} />
    )
  }
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleChange = (event) => {
    setFilter(event.target.value)
    const listOfFiltered = countries.filter(country => 
      country.name.common.toLowerCase()
        .includes(event.target.value.toLowerCase()
    ))
    setFilteredCountries(listOfFiltered)
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleChange={handleChange}
      />
      <ListCountries 
        countries={filteredCountries}/>
    </div>
  )
}

export default App;
