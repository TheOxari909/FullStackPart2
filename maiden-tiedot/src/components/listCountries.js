import DetailedCountry from "./detailedCountry"

const ListCountries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length > 1){
    return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common} country={country}>
          {country.name.common} 
          <button onClick={() => handleClick([country])}>show</button>
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
  } else {
    return <div>No countries :(</div>
  }
}

export default ListCountries