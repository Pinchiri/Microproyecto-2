import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom"
//import App from './App.jsx'
import './index.css'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Layout } from './pages/Layout/Layout'
import { homeURL, reserveURL } from './constants/urls'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element = {<Layout />}>
        <Route path = {homeURL} element = {<HomePage />} />
        <Route path = {reserveURL} element = {<h1>Hola</h1>} />
      </Route>
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
