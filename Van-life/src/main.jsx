import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter
  , Route
  , createRoutesFromElements
  , RouterProvider,
} from 'react-router-dom';

import './index.css'
import App from './Pages/App.jsx'
import About from './Pages/About.jsx'
import Vans, { loader as vansLoader }  from './Pages/Vans/Vans.jsx'
import "./server/server.js"
import VanDetail, {loader as vanDetailLoader} from "./Pages/Vans/VanDetail.jsx"
import Layout from './components/Layout'
import Dashboard from "./Pages/Host/Dashboard"
import Income from "./Pages/Host/Income"
import Reviews from "./Pages/Host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans, { loader as hostVanLoader} from "./Pages/Host/HostVans"
import HostVanDetails, {loader as hostVanDetailLoader} from './Pages/Host/HostVanDetails'
import HostVanInfo from "./Pages/Host/HostVanInfo"
import HostVanPhotos from "./Pages/Host/HostVanPhotos"
import HostVanPricing from "./Pages/Host/HostVanPricing"
import NotFound from './Pages/NotFound'
import Error from "./components/Error.jsx"
import { requireAuth } from './components/utility.js'
import Login, {loader as loginLoader, action as loginAction} from './Pages/Login'

const router = createBrowserRouter(createRoutesFromElements(

        <Route element={<Layout />}
        >
          <Route
              path="/"
              element={<App />}
          />
          <Route
              path="/about"
              element={<About />}
          />
            <Route
                path="login"
                element={<Login />}
                action={loginAction}
                loader={loginLoader}
                errorElement={<Error />}
            />
          <Route
              path='/vans'
              element={<Vans />}
              errorElement={<Error />}
              loader={vansLoader}

          />

          <Route
              path="/vans/:id"
              element={<VanDetail />}
              loader={vanDetailLoader}
          />

            <Route
                path ="host"
                element={<HostLayout/>}
                loader={requireAuth}  
                errorElement={<Error />}

            >
              <Route
                  index element={<Dashboard />}

              />
              <Route
                  path='income'
                  element={<Income />}

              />
              <Route
                  path='reviews'
                  element={<Reviews />}

              />
              <Route
                  path='vans'
                  element={<HostVans />}
                  loader={hostVanLoader}
              />

              <Route
                  path='vans/:id'
                  element={<HostVanDetails />}
                  loader={hostVanDetailLoader}
              >
                <Route
                    index 
                    element={<HostVanInfo/>}
                    loader={requireAuth}
                />
                <Route
                    path="pricing"
                    element={<HostVanPricing/>}
                    loader={requireAuth}
                />
                <Route
                    path="photos"
                    element={<HostVanPhotos/>}
                    loader={requireAuth}
                />
              </Route>
          </Route>
              {/* Catch-all for unmatched routes */}
        <Route path="*" element={<NotFound />}/>
        </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)