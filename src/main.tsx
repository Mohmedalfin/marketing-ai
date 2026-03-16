import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPageLayout from './components/Layouts/LandingPageLayout'
import AiPageLayout from './components/Layouts/AiPageLayout'
import ErrorPage from './pages/error'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPageLayout />,
      },
      {
        path: "/ai",
        element: <AiPageLayout />,
      },
      {
        path: "*",
        element: <ErrorPage />, // untuk 404
      }
    ],
  }
]);
  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
