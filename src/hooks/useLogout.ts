import { confirmAction } from "../utils/swal";

export const useLogout = () => {
    
  const handleLogout = async (onPreConfirm?: () => void) => {
    if (onPreConfirm) {
      onPreConfirm();
    }
    
    const isConfirmed = await confirmAction(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin mengakhiri sesi dan keluar dari aplikasi?",
      "Ya, Logout"
    );

    if (isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      
      window.location.href = "/";
    }
  };

  return { handleLogout };
};
