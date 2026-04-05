import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    // Mengecek apakah user sudah memiliki akses token di localStorage (sudah login)
    const token = localStorage.getItem('access_token');
    
    // Jika tidak ada token, langsung arahkan ke halaman login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika ada token (sudah login), izinkan akses ke halaman yang dituju
    return <Outlet />;
}
