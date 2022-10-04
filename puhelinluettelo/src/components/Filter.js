const Filter = ({ newFilter, handleChange }) => (
  <div>filter shown with
    <input 
      value={newFilter}
      onChange={handleChange}
    />
  </div>
)

export default Filter
