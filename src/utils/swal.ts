import Swal from 'sweetalert2';

// Base theme settings injected to Swal
export const ThemedSwal = Swal.mixin({
    customClass: {
        confirmButton: 'bg-[#39B772] hover:bg-[#2d965d] text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#39B772]/50 focus:ring-offset-2',
        cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2',
        popup: 'rounded-2xl shadow-xl border border-gray-100 p-4 font-poppins',
        title: 'text-xl font-bold text-[#545454] font-poppins',
        htmlContainer: 'text-sm font-medium text-gray-500 font-poppins',
        icon: 'border-0', // Remove default icon border if needed
        actions: 'gap-3 mt-6'
    },
    buttonsStyling: false,
    reverseButtons: true, // Typically Cancel on the left, Confirm on right
});

/**
 * Reusable Confirmation Dialog for Destructive Actions (Delete, etc.)
 */
export const confirmAction = async (
    title: string = 'Apakah Anda Yakin?',
    text: string = 'Tindakan ini tidak dapat dibatalkan.',
    confirmButtonText: string = 'Ya, Lanjutkan'
): Promise<boolean> => {
    const result = await ThemedSwal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText: 'Batal',
        focusCancel: true
    });
    return result.isConfirmed;
};

/**
 * Reusable Success Notification
 */
export const showSuccessAlert = (title: string, text?: string) => {
    return ThemedSwal.fire({
        icon: 'success',
        title,
        text,
        timer: 3000,
        showConfirmButton: false,
    });
};

/**
 * Reusable Error Notification
 */
export const showErrorAlert = (title: string, text?: string) => {
    return ThemedSwal.fire({
        icon: 'error',
        title,
        text,
        showConfirmButton: true,
        confirmButtonText: 'Tutup'
    });
};

/**
 * Mini Toast Notification (Top Right)
 */
export const showToastContent = (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            container: 'mt-20 mr-4', // offset from the header
            popup: 'rounded-xl shadow-lg border border-gray-100 font-poppins',
            title: 'text-sm font-semibold text-[#545454] font-poppins'
        }
    });
};
