import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom"
//import App from './App.jsx'
import './index.css'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Layout } from './pages/Layout/Layout'
import { homeURL, loginURL, registerURL, reserveURL } from './constants/urls'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element = {<Layout />}>
        <Route path = {homeURL} element = {<HomePage />} />
        <Route path = {registerURL} element = {<Register />} />
        <Route path = {loginURL} element = {<Login />} />
      </Route>
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
