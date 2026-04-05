// src/components/ui/ToastNotification.tsx

import React from 'react';

interface ToastNotificationProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'error' | 'success'; // Bisa diekspansi untuk tipe notif lain
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ 
    message, 
    isVisible, 
    onClose, 
    type = 'error' 
}) => {
    if (!isVisible) return null;

    const isError = type === 'error';
    const bgClass = isError ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500';
    const textClass = isError ? 'text-red-700' : 'text-green-700';
    const iconColorClass = isError ? 'text-red-500' : 'text-green-500';
    const btnClass = isError ? 'text-red-400 hover:bg-red-100 hover:text-red-600 focus:ring-red-500' : 'text-green-400 hover:bg-green-100 hover:text-green-600 focus:ring-green-500';

    return (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 slide-in-from-right-8 duration-300">
            <div className={`flex max-w-sm items-center justify-between gap-4 rounded-lg border-l-4 p-4 shadow-xl ${bgClass}`}>
                
                <div className="flex items-center gap-3">
                    {isError ? (
                        <svg className={`h-6 w-6 shrink-0 ${iconColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ) : (
                        <svg className={`h-6 w-6 shrink-0 ${iconColorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <p className={`text-sm font-semibold leading-tight ${textClass}`}>
                        {message}
                    </p>
                </div>

                <button 
                    type="button"
                    onClick={onClose}
                    className={`shrink-0 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white ${btnClass}`}
                >
                    <span className="sr-only">Tutup notifikasi</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
            </div>
        </div>
    );
};