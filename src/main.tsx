import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPageLayout from './components/Layouts/LandingPageLayout'
import AiPageLayout from './components/Layouts/AiPageLayout'
import LoginPageLayout from './components/Layouts/LoginPagelayout'
import RegisterPageLayout from './components/Layouts/RegisterPagelayout'
import DashboardPage from './pages/DashboardPage'
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
        path: "/login",
        element: <LoginPageLayout />,
      },
      {
        path: "/register",
        element: <RegisterPageLayout />,
      },
      {
        path: "/ai",
        element: <AiPageLayout />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)