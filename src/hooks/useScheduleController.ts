import { useState, useEffect } from 'react';
import { getSchedulesAPI, updateScheduleAPI, deleteScheduleAPI } from '../services/scheduleService';
import type { ScheduleItem, UpdateSchedulePayload } from '../types/schedule';

export const useScheduleController = () => {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
        isVisible: false, message: '', type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => hideToast(), 3000);
    };

    const hideToast = () => setToast(prev => ({ ...prev, isVisible: false }));

    // Fetch on mount
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const data = await getSchedulesAPI();
                
                const draftData = data.filter(item => item.status === "DRAFT");
                
                draftData.sort((a, b) => b.id - a.id);
                
                setSchedules(draftData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Gagal memuat daftar draft.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    const refetch = async () => {
        try {
            setIsLoading(true);
            const data = await getSchedulesAPI();
            setSchedules(data.filter(item => item.status === "DRAFT").sort((a, b) => b.id - a.id));
        } catch (err) {
            console.error("Gagal refetch data", err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateSchedule = async (id: number, payload: UpdateSchedulePayload) => {
        const originalSchedules = [...schedules];

        try {
            setSchedules(prev => prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        title: payload.title ?? item.title,
                        caption: payload.caption ?? item.caption,
                        scheduled_time: payload.scheduled_time ?? item.scheduled_time,
                        status: payload.status ?? item.status,
                        platform: payload.platform ?? item.platform,
                    };
                }
                return item;
            }));

            await updateScheduleAPI(id, payload);
            return { success: true };
        } catch (err) {
            setSchedules(originalSchedules);
            const errorMessage = err instanceof Error ? err.message : 'Gagal menyimpan perubahan.';
            setError(errorMessage);
            console.error("Update failed", err);
            return { success: false, error: errorMessage };
        }
    };

    const deleteSchedule = async (id: number) => {
        const originalSchedules = [...schedules];

        try {
            setSchedules(prev => prev.filter(item => item.id !== id));

            await deleteScheduleAPI(id);
            return { success: true };
        } catch (err) {
            // Rollback jika gagal
            setSchedules(originalSchedules);
            const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus data.';
            setError(errorMessage);
            console.error("Delete failed", err);
            return { success: false, error: errorMessage };
        }
    };

    return {
        schedules,
        isLoading,
        error,
        toast,
        refetch,
        updateSchedule,
        deleteSchedule,
        showToast,
        hideToast
    };
};
