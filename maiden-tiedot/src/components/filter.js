const Filter = ({ filter, handleChange }) => (
  <div>
    search for country&nbsp;
    <input 
      value={filter}
      onChange={handleChange}
    />
  </div>
)

export default Filter