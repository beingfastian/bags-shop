// import React, { useState } from "react";

// const FileUpload = () => {
//   const [fileName, setFileName] = useState("No file chosen");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFileName(event.target.files[0].name);
//     } else {
//       setFileName("No file chosen");
//     }
//   };

//   const handleUpload = () => {
//     if (fileName !== "No file chosen") {
//       console.log("Uploading file:", fileName);
//     } else {
//       alert("Please select a file to upload.");
//     }
//   };

//   const handleCancel = () => {
//     alert("Canceled");
//   };

//   return (
//     <div className="flex flex-col p-6 border rounded-lg shadow-md w-full  mx-auto sm:w-11/12">
//       <h1 className="text-xl font-bold mb-4 text-center">File Upload</h1>

//       <div className="flex flex-col items-center mb-4">
//         <label className="bg-black text-white px-4 py-2 text-nowrap rounded-md cursor-pointer mb-2">
//           Choose File
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>
//         <span className="text-sm text-gray-600">{fileName}</span>
//       </div>

//       <div className="flex flex-col mb-6">
//         <label htmlFor="woman-bag" className="mb-2 text-sm font-medium text-gray-700">
//           Update Woman Bag
//         </label>
//         <input
//           type="text"
//           id="woman-bag"
//           placeholder="Enter details"
//           className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="flex justify-end flex-col md:flex-row gap-3">
//         <button
//           onClick={handleCancel}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleUpload}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from 'react';

const FileUpload = () => {
  const [fileName, setFileName] = useState('No file chosen');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  const handleUpload = () => {
    if (fileName !== 'No file chosen') {
      console.log('Uploading file:', fileName);
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleCancel = () => {
    setFileName('No file chosen');
    alert('Canceled');
  };

  return (
    <div className="flex flex-col p-6 border rounded-lg shadow-md w-full mx-auto sm:w-11/12">
      <label
        htmlFor="woman-bag"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Update Woman Bag
      </label>
      <h1 className="text-xl font-bold mb-4 text-center">File Upload</h1>

      <div
        className={`flex flex-col items-center justify-center mb-4 border-2 border-dashed rounded-md p-6 cursor-pointer ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="w-full text-center">
          <input type="file" onChange={handleFileChange} className="hidden" />
          <p className="text-gray-600 mb-2">
            Drag and drop a file here or{' '}
            <span className="text-blue-500 underline">choose a file</span>
          </p>
        </label>
        <span className="text-sm text-gray-600">{fileName}</span>
      </div>

      {/* <div className="flex flex-col mb-6">
        <label htmlFor="woman-bag" className="mb-2 text-sm font-medium text-gray-700">
          Update Woman Bag
        </label>
        <input
          type="text"
          id="woman-bag"
          placeholder="Enter details"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      <div className="flex  justify-end flex-col md:flex-row gap-3">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
