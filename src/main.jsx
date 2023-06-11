import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import './index.css'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Layout } from './pages/Layout/Layout'
import { adminURL, homeURL, loginURL, profileURL, registerURL, reserveURL } from './constants/urls'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx'
import { MovieDetails } from './pages/MovieDetails/MovieDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element = {<Layout />}>
        <Route path = {homeURL} element = {<HomePage />} />
        <Route path = {registerURL} element = {<Register />} />
        <Route path = {loginURL} element = {<Login />} />
        <Route path = {reserveURL} element = {
          <PrivateRoute>
            <h1>RESERVE</h1>
          </PrivateRoute>
        } />
        <Route path = {profileURL} element = {
          <PrivateRoute>
            <h1>PROFILE</h1>
          </PrivateRoute>
        } />
        <Route path = {adminURL} element = {
          <PrivateRoute>
            <h1>ADMIN</h1>
          </PrivateRoute>
          
        } />
        <Route path = '/movies/:movieId' element = {<MovieDetails />} />
      </Route>
           
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
