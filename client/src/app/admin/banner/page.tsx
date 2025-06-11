'use client';

import React, { useState } from 'react';
import Modal from '@/app/components/Modal';
import { useUpload } from '@/hooks/useHeroSectionUpload';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from '@/app/components/Dropdown';
import { addHeroImages, updateHeroImage } from '@/services/HeroSectionUpload';
import { HeroImage } from '@/types/types';

const Page = () => {
  const { uploading, error, heroImages, handleDeleteImage } = useUpload();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroImage | null>(null);

  const [dropdownValue, setDropdownValue] = useState("hero");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  
  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [filterImages, setFilterImages] = useState("");
  
  // NEW: Text content states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // UPDATED: Handle upload with text fields
  const handleUpload = async () => {
    if (file && name) {
      try {
        const response = await addHeroImages({
          file,
          background: isChecked,
          type: dropdownValue,
          name,
          title,
          subtitle,
          button_text: buttonText,
          button_link: buttonLink,
          is_active: isActive,
          sort_order: sortOrder,
        });

        if (response) {
          toast.success('Hero content uploaded successfully! 🎉');
          console.log('Uploaded Hero:', response);
          resetForm();
          setShowModal(false);
        } else {
          toast.error('Failed to upload hero content. Please try again.');
        }
      } catch (error) {
        toast.error('Error uploading hero content.');
        console.error('Upload error:', error);
      }
    }
  };

  // NEW: Handle edit
  const handleEdit = (hero: HeroImage) => {
    setEditingHero(hero);
    setName(hero.name || '');
    setTitle(hero.title || '');
    setSubtitle(hero.subtitle || '');
    setButtonText(hero.button_text || '');
    setButtonLink(hero.button_link || '');
    setIsActive(hero.is_active);
    setSortOrder(hero.sort_order);
    setDropdownValue(hero.type);
    setShowEditModal(true);
  };

  // NEW: Handle update
  const handleUpdate = async () => {
    if (!editingHero) return;

    try {
      const updateData = {
        name,
        title,
        subtitle,
        button_text: buttonText,
        button_link: buttonLink,
        is_active: isActive,
        sort_order: sortOrder,
      };

      const response = await updateHeroImage(editingHero.id, updateData);
      
      if (response) {
        toast.success('Hero content updated successfully! 🎉');
        resetForm();
        setShowEditModal(false);
        setEditingHero(null);
      }
    } catch (error) {
      toast.error('Error updating hero content.');
      console.error('Update error:', error);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setName('');
    setTitle('');
    setSubtitle('');
    setButtonText('');
    setButtonLink('');
    setIsActive(true);
    setSortOrder(0);
  };

  const handleDeleteClick = (id: number) => {
    setImageToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (imageToDelete !== null) {
      await handleDeleteImage(imageToDelete);
      toast.success('Hero content deleted successfully!');
      setImageToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const options = [
    {
      label: "hero image",
      value: "hero",
    },
    {
      label: "Banner image",
      value: "banner"
    }
  ];

  const handleDropdown = (value: any) => {
    console.log("value", value);
    setFilterImages(value);
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className='flex justify-between'>
        <h1 className="text-xl font-bold mb-4">Manage Hero Content</h1>
        <Dropdown options={options} onSelect={handleDropdown} />
      </div>

      {/* Add Hero Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-primary text-white rounded mb-4"
      >
        + Add Hero Section Content
      </button>

      {/* UPDATED: Upload Modal with Text Fields */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-bold mb-4">Add Hero Content</h2>

        <div className="max-h-[70vh] overflow-y-auto space-y-4">
          {/* Image Upload Section */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Image Upload</h3>
            
            <input
              type="text"
              placeholder="Enter image name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 w-full px-3 py-2 border rounded"
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2 cursor-pointer"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-32 object-cover rounded shadow mb-2"
              />
            )}

            <Dropdown
              options={options}
              onSelect={(value) => setDropdownValue(value)}
            />

            <div className="mt-2">
              <input
                type="checkbox"
                id="removeBackground"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="removeBackground" className="ml-2">
                Remove background
              </label>
            </div>
          </div>

          {/* NEW: Text Content Section */}
          <div className="space-y-3">
            <h3 className="font-semibold">Text Content</h3>
            
            <input
              type="text"
              placeholder="Hero Title (e.g., Uncompromising Quality...)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <textarea
              placeholder="Hero Subtitle/Description"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border rounded h-20"
            />

            <input
              type="text"
              placeholder="Button Text (e.g., Shop Collection)"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <input
              type="url"
              placeholder="Button Link (e.g., /products)"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <div className="flex gap-4">
              <div>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="isActive" className="ml-2">Active</label>
              </div>

              <div>
                <label className="mr-2">Sort Order:</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-400 cursor-pointer hover:bg-green-500 text-white rounded"
            disabled={uploading || !name || !file}
          >
            {uploading ? 'Uploading...' : 'Add Hero Content'}
          </button>
        </div>
      </Modal>

      {/* NEW: Edit Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2 className="text-lg font-bold mb-4">Edit Hero Content</h2>

        <div className="max-h-[70vh] overflow-y-auto space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Image name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            
            <input
              type="text"
              placeholder="Hero Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <textarea
              placeholder="Hero Subtitle/Description"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border rounded h-20"
            />

            <input
              type="text"
              placeholder="Button Text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <input
              type="url"
              placeholder="Button Link"
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />

            <div className="flex gap-4">
              <div>
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="editIsActive" className="ml-2">Active</label>
              </div>

              <div>
                <label className="mr-2">Sort Order:</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <button
            onClick={() => {
              setShowEditModal(false);
              setEditingHero(null);
              resetForm();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Update Hero Content
          </button>
        </div>
      </Modal>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* UPDATED: Hero Content Grid with Edit/Delete */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Hero Content</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {heroImages
            ?.filter((image: any) => !filterImages || image.type === filterImages)
            .map((hero: HeroImage) => (
              <div
                key={hero.id}
                className="border rounded-md overflow-hidden shadow-lg"
              >
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-32 object-contain"
                />
                <div className="p-3 space-y-2">
                  <h3 className="text-sm font-semibold">{hero.name}</h3>
                  
                  {/* NEW: Display text content */}
                  {hero.title && (
                    <p className="text-xs text-gray-600 truncate">
                      <strong>Title:</strong> {hero.title}
                    </p>
                  )}
                  {hero.button_text && (
                    <p className="text-xs text-gray-600">
                      <strong>Button:</strong> {hero.button_text}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        hero.is_active
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {hero.is_active ? 'Active' : 'Inactive'}
                    </span>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(hero)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <AiFillEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(hero.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiFillDelete className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {heroImages?.filter((image: any) => !filterImages || image.type === filterImages).length === 0 && (
            <div className="text-center text-gray-500 py-4 col-span-full">
              No hero content available
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <h2 className="text-lg font-bold mb-8 text-primary">
          Are you sure you want to delete this hero content?
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
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Page;