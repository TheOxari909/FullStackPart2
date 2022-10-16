import { useState, useEffect } from 'react'
import axios from 'axios'

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

export default Weather