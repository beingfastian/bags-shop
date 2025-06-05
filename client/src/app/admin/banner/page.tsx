'use client';

import React, { useState } from 'react';
import Modal from '@/app/components/Modal';
import { useUpload } from '@/hooks/useHeroSectionUpload';
import { AiFillDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from '@/app/components/Dropdown';
import { addHeroImages } from '@/services/HeroSectionUpload';

const Page = () => {
  const {  uploading, error, heroImages, handleDeleteImage } =
    useUpload();
  const [showModal, setShowModal] = useState(false);

  const [dropdownValue,setDropdownValue]=useState("hero")
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for the confirmation modal
  const [imageToDelete, setImageToDelete] = useState<number | null>(null); // Store the image ID to be deleted
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [filterImages,setFilterImages]=useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };



 
  const handleUpload = async () => {
    if (file && name ) {

        const response=await addHeroImages( {file, background:isChecked, type:dropdownValue, name})
      if (response) {
        toast.success('Image uploaded successfully! 🎉');
        console.log('Uploaded and Saved Image:', response);
        setFile(null);
        setPreview(null);

        setName('');
        setShowModal(false);
      } else {
        toast.error('Failed to upload image. Please try again.');
      }
    }
  };

  // Open the confirmation modal when the delete icon is clicked
  const handleDeleteClick = (id: number) => {
    setImageToDelete(id);
    setShowConfirmModal(true);
  };

  // Confirm the delete action
  const handleConfirmDelete = async () => {
    if (imageToDelete !== null) {
      await handleDeleteImage(imageToDelete); // Delete the image
      toast.success('Image deleted successfully!');
      setImageToDelete(null); // Clear image to delete
      setShowConfirmModal(false); // Close the modal
    }
  };






  const options=[{
    label: "hero image",
    value:"hero",

  },
{
  label:"Banner image",
  value:"banner"
}
]

const [isChecked, setIsChecked] = useState(false);
  const handleDropdown=(value: any)=>{
    console.log("value",value)
  setFilterImages(value)
  
  }



  const handleCheckboxChange = (event:any) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='flex justify-between'>
      <h1 className="text-xl font-bold mb-4">Manage Images</h1>
      <Dropdown  options={options} onSelect={handleDropdown} />
      </div>
      
      {/* Add Image Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-primary text-white rounded mb-4"
      >
        + Add Hero Section Image
      </button>

      {/* Modal for Upload */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-bold mb-4">Upload Image</h2>

        {/* Input for Image Name */}
        <input
          type="text"
          placeholder="Enter image name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded"
        />

        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 cursor-pointer"
        />

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded shadow"
            />
          </div>
        )}
   <Dropdown  options={options} onSelect={(value)=>{setDropdownValue(value)}} />

        {/* Actions */}


        <div>
      <input
        type="checkbox"
        id="myCheckbox"
        value="checkboxValue"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="myCheckbox">Do you want to remove backgorund!</label>

     
    </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-400 cursor-pointer hover:bg-green-500 text-white rounded"
            disabled={uploading || !name || !file}
          >
            {uploading ? 'Uploading...' : 'Add'}
          </button>
        </div>
      </Modal>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Uploaded Images</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {heroImages?.map((image: any) => (
            <div
              key={image.id}
              className="border rounded-md overflow-hidden shadow-lg py-4"
            >
              <img
                src={image.image}
                alt={image.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-sm font-semibold">{image.name}</h3>
                <button
                  onClick={() => handleDeleteClick(image.id)} // Open confirmation modal on delete
                  className="text-red-500 hover:text-red-700"
                >
                  <AiFillDelete className="text-2xl text-primary" />
                </button>
              </div>
            </div>
          ))} */}


{heroImages
  ?.filter((image: any) => !filterImages || image.type === filterImages) // Apply filter only if filterImage has a value
  .map((image: any) => (
    <div
      key={image.id}
      className="border rounded-md overflow-hidden shadow-lg py-4"
    >
      <img
        src={image.image}
        alt={image.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-sm font-semibold">{image.name}</h3>
        <button
          onClick={() => handleDeleteClick(image.id)} // Open confirmation modal on delete
          className="text-red-500 hover:text-red-700"
        >
          <AiFillDelete className="text-2xl text-primary" />
        </button>
      </div>
    </div>
  ))}

{heroImages?.filter((image: any) => !filterImages || image.type === filterImages).length === 0 && (
  <div className="text-center text-gray-500 py-4">
    No data available
  </div>
)}
        </div>
        
      </div>

      {/* Confirmation Modal for Deletion */}
      <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <h2 className="text-lg font-bold mb-8 text-primary">
          Are you sure you want to delete this image?
        </h2>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-500"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
