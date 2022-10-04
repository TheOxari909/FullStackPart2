const Header = ({ name }) => (
  <h1>{name}</h1>
)

const Content = ({ course }) => {
  console.log(course)

  return (
    <div>
      {course.map(content => 
        <p key={content.id}>
          {content.name} {content.exercises}
        </p>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App