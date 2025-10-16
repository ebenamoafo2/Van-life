import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route,Link } from 'react-router';
import './index.css'
import App from './Pages/App.jsx'
import About from './Pages/About.jsx'
import Vans from './Pages/Vans/Vans.jsx'
import "./server/server.js"
import VanDetail from "./Pages/Vans/VanDetail.jsx"
import Layout from './components/Layout'
import Dashboard from "./Pages/Host/Dashboard"
import Income from "./Pages/Host/Income"
import Reviews from "./Pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans from "./Pages/Host/HostVans"
import HostVanDetails from './Pages/Host/HostVanDetails'
import HostVanInfo from "./Pages/Host/HostVanInfo"
import HostVanPhotos from "./Pages/Host/HostVanPhotos"
import HostVanPricing from "./Pages/Host/HostVanPricing"
import NotFound from './Pages/NotFound'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />

            <Route path ="host" element={<HostLayout/>}>
              <Route index element={<Dashboard />} />
              <Route path='income' element={<Income />} />
              <Route path='reviews' element={<Reviews />} />
              <Route path='vans' element={<HostVans />} />

              <Route path='vans/:id' element={<HostVanDetails />} >
                <Route index element={<HostVanInfo/>} />
                <Route path="pricing" element={<HostVanPricing/>} />
                <Route path="photos" element={<HostVanPhotos/>} />
              </Route>
          </Route>           
              {/* Catch-all for unmatched routes */}
        <Route path="*" element={<NotFound />}/> 
        </Route>  
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
