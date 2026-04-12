
import { createElement, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/Layouts/ProtectedRoute';

const LandingPageLayout  = lazy(() => import('./components/Layouts/LandingPageLayout'));
const LoginPageLayout    = lazy(() => import('./components/Layouts/LoginPagelayout'));
const RegisterPageLayout = lazy(() => import('./components/Layouts/RegisterPagelayout'));
const DashboardPage      = lazy(() => import('./pages/DashboardPage'));
const AiPageLayout       = lazy(() => import('./components/Layouts/AiPageLayout'));
const SchedulePageLayout = lazy(() => import('./components/Layouts/SchedulePageLayout'));
const ProfilePageLayout  = lazy(() => import('./components/Layouts/ProfilePageLayout'));
const ErrorPage          = lazy(() => import('./pages/error'));

export const router = createBrowserRouter([
  {
    errorElement: createElement(ErrorPage),
    children: [
      {
        path: '/',
        element: createElement(LandingPageLayout),
      },
      {
        path: '/login',
        element: createElement(LoginPageLayout),
      },
      {
        path: '/register',
        element: createElement(RegisterPageLayout),
      },
      {
        element: createElement(ProtectedRoute),
        children: [
          {
            path: '/ai',
            element: createElement(AiPageLayout),
          },
          {
            path: '/dashboard',
            element: createElement(DashboardPage),
          },
          {
            path: '/schedule',
            element: createElement(SchedulePageLayout),
          },
          {
            path: '/profile',
            element: createElement(ProfilePageLayout),
          },
        ],
      },
      {
        path: '*',
        element: createElement(ErrorPage),
      },
    ],
  },
]);
