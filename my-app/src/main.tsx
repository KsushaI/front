import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Visas from './pages/Page1'
import Page2 from './pages/Page2'
import App from './App.tsx'


const router = createBrowserRouter([
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/visas',
    element: <Visas />
  },
  {
    path: '/details',
    element: <Page2 />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  /*<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>,*/
 <App />
)

