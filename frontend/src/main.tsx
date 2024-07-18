import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Login } from './pages/Login/Login.tsx'
import {Courses} from './pages/Courses/Courses.tsx'
import App from './App.tsx'
import { Home } from './pages/Home/index.tsx'
import { SignUp } from './pages/SignUp/SignUp.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element:
    <App>
      <Login/>
    </App>
  },
  {
    path: "/home",
    element:
    <App>
      <Home/>
    </App>
  },
  {
    path: "/classes",
    element:
    <App>
      <Courses/>
    </App>
  },
  {
    path: "/signup",
    element:
    <App>
      <SignUp/>
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

