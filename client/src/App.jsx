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
import BookingPage from './pages/BookingPage'
import PlacePage from './pages/PlacePage'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
console.log(import.meta.env.VITE_API_BASE_URL)
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
          <Route path='/account/bookings/:id' element={<BookingPage/>} />
          <Route path='/account/places' element={<PlacesPage/>} />
          <Route path='/account/places/new' element={<PlaceForm/>} />
          <Route path='/account/places/:id' element={<PlaceForm/>} />
          <Route path='/place/:id' element={<PlacePage/>} />
        </Route>
      </Routes>
  )
}

export default App
