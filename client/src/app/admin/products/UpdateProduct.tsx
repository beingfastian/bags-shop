'use client';

import React, { useState } from 'react';

interface Props {
  product: {
    name: string;
    description: string;
    price: string;
    stock: string;
    color: string;
    sku?: string;
    discount: string;
    quantity: string;
    gender: string;
    image?: string;
    category?: string;
  };
  onClose: () => void;
  onSubmit: (updatedProduct: any, imageFile?: File | null) => void;
}

const UpdateProducts: React.FC<Props> = ({ product, onClose, onSubmit }) => {
  const [formState, setFormState] = useState(product);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(product.image || '');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (['stock', 'price', 'discount'].includes(name)) {
      const numericValue = parseInt(value);
      if (numericValue < 0 || isNaN(numericValue)) {
        setFormState((prev) => ({
          ...prev,
          [name]: '0', // Set to 0 if input is invalid
        }));
        return;
      }
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(product.image || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState, selectedImage); // Pass the updated product and image file
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" rounded-lg max-h-[60vh]  md:max-h-[70vh] overflow-y-scroll w-[200px] xxs:w-[300px]  sm:w-[400px] scrollbar-blue"
    >
      <div className="mb-6">
        <label className="block font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 resize-none bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
          required
        />
      </div>

      <div className="mb-6 grid  sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            value={formState.stock}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Color</label>
        <input
          type="text"
          name="color"
          value={formState.color}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Category</label>
        <input
          type="text"
          name="color"
          value={formState.category}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Discount</label>
        <input
          type="text"
          name="discount"
          value={formState.discount}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Gender</label>
        <input
          type="text"
          name="gender"
          value={formState.gender}
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-md"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 w-full object-cover rounded-lg shadow-md"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 gap-y-4 sm:gap-y-0">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UpdateProducts;
