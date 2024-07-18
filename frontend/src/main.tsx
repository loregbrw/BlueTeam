import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Login } from './pages/Login/Login.tsx'
import App from './App.tsx'
import { Home } from './pages/Home/index.tsx'
import { Course } from './pages/Course/index.tsx'



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
    path: "/course",
    element:
    <App>
      <Course />
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

