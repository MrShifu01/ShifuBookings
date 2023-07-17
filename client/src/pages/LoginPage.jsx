import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { setPage } from '../redux/pageSlice'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage('/login'))
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/login', {
        email,
        password
      })

      dispatch(setUser(response.data))
      setRedirect(true)
    } catch (e) {
      alert("login failed")
    }
  }

  if (redirect) {
    return (
      <Navigate to='/'/>
    )
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <input 
          type="text" 
          placeholder='dave@gmail.com' 
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder='dave' 
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className='text-center py-2 text-gray-500'>
            Dont have an account? <Link className='underline text-black' to='/register'>Register</Link>
          </div>
        </form>
        <div>
          <h2 className='text-2xl mt-2'>Demo Account</h2>
          <p><strong>Email: </strong>dave@gmail.com</p>
          <p><strong>Password: </strong>dave</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage