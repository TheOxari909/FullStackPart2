const Numbers = ({ filtered, deleteNum }) => (
    filtered.map(person => 
        <p key={person.name}>{person.name} {person.number}
            <button onClick={() => deleteNum(person.id, person.name)}>
                delete
            </button>
        </p>
    )
)

export default Numbers