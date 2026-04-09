/**
 * Convert a File object to a Base64 string
 * Resolves with just the raw base64 data (without the data URI prefix)
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Membuang bagian "data:image/png;base64," agar tersisa raw base64-nya saja
      const base64Data = result.split(',')[1] || result;
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};
