import axios from '@/lib/axios';

// import axios from "axios";

export const uploadOne = async ({ file }: { file: File; }) => {

  console.log("file recived",file)
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }

  const response = await axios.post('/upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};







export const uploadMultiple = async ({ files }: { files: File[]; }) => {
  console.log("files received", files);

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files[]', file);  
  });


  const response = await axios.post('/upload/multiple', formData, {
    timeout:90000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    
  });

  return response.data;  
};


