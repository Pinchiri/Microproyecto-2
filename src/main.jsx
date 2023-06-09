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
import { Reserve } from './pages/Reserve/Reserve'
import { Profile } from './pages/Profile/Profile'
import AdminRoute from './components/AdminRoute/AdminRoute'
import AdminPage from './pages/AdminPage/AdminPage'

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
            <Reserve />
          </PrivateRoute>
        } />
        <Route path = {profileURL} element = {
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path = {adminURL} element = {
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
          
        } />
        <Route path = '/movies/:movieId' element = {<MovieDetails />} />
      </Route>
           
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
