import { convertToUrl } from '@/utils/image';
import React, { useRef, useState } from 'react';
import { useController } from 'react-hook-form';

interface ImageProps {
  className?: string;
  control: any;
  name?: string;
  defaultValue?: string | File;
}

const ImageUpload = ({
  control,
  className,
  name = '',
  defaultValue = '',
}: ImageProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { field } = useController({
    control,
    name,
    defaultValue,
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const defaultUrl = ({ value }: { value: string | File }) => {
    if (value instanceof File) {
      let url;
      convertToUrl(value).then((item) => {
        url = item;
      });

      return url || '';
    }
    return value;
  };

  return (
    <div
      className={`border-dashed border-[2px] border-gray-300 rounded-lg flex items-center justify-center w-full h-[168px] text-center cursor-pointer ${className}`}
    >
      <label className=" cursor-pointer w-full flex-col h-full flex justify-center items-center overflow-hidden">
        {previewImage || defaultValue ? (
          <img
            onClick={handleButtonClick}
            src={previewImage || defaultUrl({ value: defaultValue || '' })}
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
