import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom"
//import App from './App.jsx'
import './index.css'
import { HomePage } from './pages/HomePage/HomePage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<HomePage />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
