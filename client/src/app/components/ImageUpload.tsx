import React, { useRef, useState } from 'react';
import { useController } from 'react-hook-form';

interface ImageProps {
  className?: string;
  control: any;
  name?: string;
}

const ImageUpload = ({ control, className, name = '' }: ImageProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the input

  const { field } = useController({
    control,
    name,
    defaultValue: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    field.onChange(file); // Update form state with the file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-dashed border-[2px] border-gray-300 rounded-lg flex items-center justify-center w-full h-[168px] text-center cursor-pointer ${className}`}
    >
      <label className=" cursor-pointer w-full flex-col h-full flex justify-center items-center overflow-hidden">
        {previewImage ? (
          <img
            onClick={handleButtonClick}
            src={previewImage}
            alt="Preview"
            className="flex-shrink-0 min-w-full min-h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-[16px] w-[102px] h-[42px] font-OpenSans border rounded border-[#D7DBEC] text-[#1E5EFF]"
            >
              Add File
            </button>
            <p className="text-gray-500 font-OpenSans text-sm font-normal">
              Or drag and drop files
            </p>
          </>
        )}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
