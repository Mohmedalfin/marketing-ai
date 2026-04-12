// src/components/ui/ToastNotification.tsx

import React from 'react';

interface ToastNotificationProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'error' | 'success';
    positionClassName?: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
    message,
    isVisible,
    onClose,
    type = 'error',
    positionClassName = 'top-22 sm:top-24'
}) => {
    if (!isVisible) return null;

    const isError = type === 'error';

    const iconWrapClass = isError
        ? 'bg-red-50 text-red-500'
        : 'bg-emerald-50 text-emerald-500';

    const textClass = isError ? 'text-red-600' : 'text-emerald-600';

    return (
        <div className={`fixed ${positionClassName} left-1/2 z-[100] w-[calc(100%-32px)] max-w-[320px] -translate-x-1/2 animate-in fade-in slide-in-from-top-3 duration-300 sm:${positionClassName} sm:right-6 sm:left-auto sm:w-full sm:max-w-[340px] sm:translate-x-0 sm:slide-in-from-right-6`}>
            <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur-md sm:px-4 sm:py-3.5">
                
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconWrapClass}`}>
                    {isError ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                d="M12 8v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z"
                            />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                d="M9 12.75l2.25 2.25L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-snug text-[#2b2b2b] sm:text-sm">
                        {message}
                    </p>
                    <p className={`mt-1 text-[11px] font-medium ${textClass}`}>
                        {isError ? 'Terjadi kendala pada proses' : 'Aksi berhasil diproses'}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <span className="sr-only">Tutup notifikasi</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};