import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Login } from './pages/Login/Login.tsx'
import App from './App.tsx'
import { Home } from './pages/Home/index.tsx'
import { SignUp } from './pages/SignUp/SignUp.tsx'
import { Class } from './pages/Class/index.tsx'
import { Subjects } from './pages/Subjects/Subjects.tsx'
import { Lessons } from './pages/Lessons/Lessons.tsx'
import { Profile } from './pages/Profile/Profile.tsx'
import { ToastContainer } from 'react-toastify'
import { Classes } from './pages/Classes/Classes.tsx'
import { ChangePassword } from './pages/ChangePassword/index.tsx'
import { Reports } from './pages/Reports/Reports.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:
    <App>
      <Login/>
    </App>
  },
  {
    path: "/password",
    element:
    <App>
      <ChangePassword />
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
    path: "/class/:classId",
    element:
    <App>
      <Class />
    </App>
  },
  {
    path: "/subjectclass/:subjectclassId"

  },
  {
    path: "/classes",
    element:
    <App>
      <Classes/>
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
  },
  {
    path: "/reports/:userId",
    element:
    <App>
      <Reports/>
    </App>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer/>
  </React.StrictMode>,
)

