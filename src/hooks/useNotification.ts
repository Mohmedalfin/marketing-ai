// src/hooks/useNotification.ts

import { useState, useEffect, useCallback } from 'react';

export const useNotification = (externalError?: string) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [type, setType] = useState<'error' | 'success'>('error');

    const showNotification = useCallback((msg: string, notifType: 'error' | 'success' = 'error') => {
        setMessage(msg);
        setType(notifType);
        setIsVisible(true);
    }, []);

    const closeNotification = useCallback(() => {
        setIsVisible(false);
    }, []);

    useEffect(() => {
        if (externalError) {
            const triggerTimer = setTimeout(() => {
                showNotification(externalError, 'error');
            }, 0); 
            
            return () => clearTimeout(triggerTimer);
        }
    }, [externalError, showNotification]);

    useEffect(() => {
        if (isVisible) {
            const hideTimer = setTimeout(() => {
                closeNotification();
            }, 3500);
            
            return () => clearTimeout(hideTimer);
        }
    }, [isVisible, closeNotification]);

    return { 
        notifMessage: message, 
        isNotifVisible: isVisible, 
        notifType: type,
        showNotification, 
        closeNotification 
    };
};