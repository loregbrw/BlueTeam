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
import { Class } from './pages/Class/index.tsx'
import { Subjects } from './pages/Subjects/Subjects.tsx'
import { Lessons } from './pages/Lessons/Lessons.tsx'
import { Profile } from './pages/Profile/Profile.tsx'



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
    path: "/class",
    element:
    <App>
      <Class />
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
  },
  {
    path: "/lessons",
    element:
    <App>
      <Lessons/>
    </App>
  },
  {
    path: "/profile/:userId",
    element:
    <App>
      <Profile/>
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

