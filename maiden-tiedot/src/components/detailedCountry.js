import Weather from './weather'

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

export default DetailedCountry