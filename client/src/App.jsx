import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import axios from 'axios'
import PlaceForm from './components/PlaceForm'
import PlacesPage from './pages/PlacesPage'
import BookingsPage from './pages/BookingsPage'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/account' element={<AccountPage/>} />
          <Route path='/account/bookings' element={<BookingsPage/>} />
          <Route path='/account/places' element={<PlacesPage/>} />
          <Route path='/account/places/new' element={<PlaceForm/>} />
        </Route>
      </Routes>
  )
}

export default App
