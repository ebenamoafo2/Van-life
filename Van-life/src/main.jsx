import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route,Link } from 'react-router';
import './index.css'
import App from './App.jsx'
import About from './About'
import Vans from './Vans.jsx'
import "./server/server.js"
import VanDetail from "./VanDetail"
import Layout from './components/Layout'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
