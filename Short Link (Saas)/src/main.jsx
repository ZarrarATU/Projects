import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import MainLayout from './MainLayout.jsx'
import Login from './pages/Login.jsx'
import { Landing } from './pages/Landing.jsx'
import { SignUp } from './pages/SignUp.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import {UpdatePassword} from './pages/UpdatePassword.jsx'
import { Provider, useSelector } from 'react-redux'
import { store } from './store/store.js'
import { NotFound } from './pages/NotFound.jsx'
import { AuthRedirect } from './components/AuthRedirect/AuthRedirect.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        element: <MainLayout></MainLayout>,
        children: [
          { path: '/', element: <Landing></Landing> },
        ]
      },
      {
        children: [
          { path: '/login', element: <AuthRedirect><Login></Login></AuthRedirect> },
          { path: '/sign-up', element: <AuthRedirect><SignUp></SignUp></AuthRedirect> },
          { path: '/reset-password', element: <ResetPassword></ResetPassword> },
          { path: '/update-password', element: <UpdatePassword></UpdatePassword> },
          { path: '*', element: <NotFound></NotFound> },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
