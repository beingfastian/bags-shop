export const convertToUrl = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return '';
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

export const removeBackground=async(file:File)=>{

const formData = new FormData();
formData.append('image_file', file);
formData.append('size', 'auto');

try {
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'qE2Bhkznvf2LLUVSNcBfo9b2',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Remove.bg API error: ${response.statusText}`);
  }

  const blob = await response.blob();
  return new File([blob], file.name, { type: blob.type });
} catch (err) {
 
  throw err;
}
}