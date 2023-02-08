
const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(i =>
        <Part key={i.id} part={i} />
      )}
    </div>
  )
}

const Header = ({ course }) => {
  return (
      <h2>{course.name}</h2>
  )
}

const Course = ({ course }) => {
  const initialValue = 0
  const total = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
  )
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <strong>total of {total} exercises</strong>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

export default Course