import Swal from 'sweetalert2';

// Base theme settings injected to Swal
export const ThemedSwal = Swal.mixin({
  customClass: {
    confirmButton:
      'bg-[#39B772] hover:bg-[#2d965d] text-white font-semibold text-sm py-2 px-4 md:px-5 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39B772]/40 focus:ring-offset-2',
    cancelButton:
      'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-2 px-4 md:px-5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-gray-300/60 focus:ring-offset-2',
    popup:
      'rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 font-poppins',
    title:
      'text-base md:text-xl font-bold text-[#545454] font-poppins',
    htmlContainer:
      'text-[13px] md:text-sm font-medium text-gray-500 font-poppins',
    icon: 'border-0',
    actions: 'gap-2 md:gap-3 mt-4 md:mt-6 w-full'
  },
  buttonsStyling: false,
  reverseButtons: true,
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
            container: 'mt-20 mr-4', 
            popup: 'rounded-xl shadow-lg border border-gray-100 font-poppins',
            title: 'text-sm font-semibold text-[#545454] font-poppins'
        }
    });
};
