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
import { Course } from './pages/Course/index.tsx'
import { SignUp } from './pages/SignUp/SignUp.tsx'
import { Subjects } from './pages/Subjects/Subjects.tsx'



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
  },
  {
    path: "/subjects",
    element:
    <App>
      <Subjects/>
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

