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

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])
  const [done, setDone] = useState(false)
  
  useEffect(() => {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
      setDone(true)
      console.log()
    })
  }, [])

  return (
    done === true ?
    <div>
      <h3> Weather in {city} </h3>
      <div> Temperature is {weather.main.temp} °C</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
      <div>wind speed is {weather.wind.speed} m/s</div>
    </div>
    :
    <div>waiting...</div>
  )
}

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
      <Weather 
        city={country.capital}
      />
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
      <DetailedCountry 
        country={countries[0]}
        />
    )
  }
}

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
    setFilteredCountries(listOfFiltered)
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
          />
        :
        <div>Loading countries...</div>
      }
    </div>
  )
}

export default App;
