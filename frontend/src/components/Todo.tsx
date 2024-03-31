import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Todo = (props: string) => {
  return (
    <div className='container m-3'>
      <h4>{new Date().getDate()}</h4>
      <p>{props}</p>
    </div>
  )
}

export default Todo
