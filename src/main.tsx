// src/main.tsx — Entry point aplikasi
// File ini hanya berisi bootstrapping render agar Vite Fast Refresh bekerja sempurna.

import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';
import PageLoader from './components/Elements/PageLoader';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);