const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Content = ({ course }) => (
    <div>
        {course.map(content => 
        <p key={content.id}>
            {content.name} {content.exercises}
        </p>
        )}
    </div>
)

const Total = ({ parts }) => {
    const total =
        parts.reduce((totaled, toAdd) => {
        return totaled + toAdd.exercises
        }, 0)

    return (
        <h3>
        total of {total} exercises
        </h3>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content course={course.parts} />
        <Total parts={course.parts}/>
    </div>
)

export default Course