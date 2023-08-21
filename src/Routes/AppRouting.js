import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../shared/layouts/header/Header'
import Sidebar from '../shared/layouts/Sidebar/Sidebar'
import AuthenticationWrapper from '../views/authentication/AuthenticationWrapper'
import SignIn from '../views/authentication/SignIn'
import MainRouting from './MainRouting'
import { getRoutingArrayByRole } from './RoutingConfig'

export default function AppRouting() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, SetUserRole] = useState('seller');
  const [activeRouting, setActiveRouting] = useState([]);

  useEffect(() => {
    const getActiveRouting = async () => {
      const routing = await getRoutingArrayByRole(userRole);
      console.log('@ routing', routing);
      setActiveRouting(routing);
      setUserLoggedIn(true);
    }
    getActiveRouting()
  }, [isUserLoggedIn, userRole]);

  return (
    <div>
      {isUserLoggedIn && <Sidebar />}
      {/* {isUserLoggedIn && <Header />} */}
      <div style={{ marginLeft: '55px', marginTop: '50px', padding: '5px' }}>
        <BrowserRouter>
          <Routes>
            <Route key={1} path='/' element={<AuthenticationWrapper />} />
            <Route key={2} path='/account' element={<SignIn />} />

            {isUserLoggedIn && activeRouting.map((route, index) => {
              return <Route key={index} path={route.path} element={route.component} />
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
