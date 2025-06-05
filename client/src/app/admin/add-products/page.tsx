//new code
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';
import { Cross } from '../../components/Icons';
import { useCreateProduct } from '@/hooks/useProducts';
import { useCategory } from '@/hooks/useCategory';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Link from 'next/dist/client/link';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FaStarOfLife } from 'react-icons/fa';
import { uploadMultiple } from '@/services/uploadService';

const Dropdown = dynamic(() => import('@/app/components/Dropdown'), {
  ssr: false,
});
const productSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  productDescription: yup.string().optional(),
  productPrice: yup
    .number()
    .typeError('Product price should be a number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  quantity: yup
    .number()
    .typeError('Product price should be a number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  discountPrice: yup
    .number()
    .typeError('Product price should be a number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  gender: yup.string().optional(),
  category: yup
    .array()
    .min(1, 'Category is required')
    .of(yup.string().required('Each category must be selected')),
  material: yup.string().optional(),
  comportment: yup.string().optional(),
});

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Both', value: 'both' },
];
const AddProduct = () => {
  const router = useRouter();
  const [sections, setSections] = useState([{ id: Date.now() }]);
  const [selectedCategories, setSelectedCategories] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [variantImages, setVariantImages] = useState<File[][]>([]);
  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const { data: categories } = useCategory();

  const handleAddMore = () => {
    setSections([...sections, { id: Date.now() }]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length > 1) {
      const updatedSections = sections.filter((_, idx) => idx !== index);
      setSections(updatedSections);
    }
  };

  const handleVariantImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const updatedVariantImages = [...variantImages];
      updatedVariantImages[index] = [
        ...(updatedVariantImages[index] || []),
        ...files,
      ];
      setVariantImages(updatedVariantImages);
    }
  };

  const handleRemoveVariantImage = (
    variantIndex: number,
    imageIndex: number
  ) => {
    const updatedVariantImages = [...variantImages];
    updatedVariantImages[variantIndex] = updatedVariantImages[
      variantIndex
    ].filter((_, i) => i !== imageIndex);
    setVariantImages(updatedVariantImages);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if within a form
      handleAddTag(); // Add the tag on Enter
    }
  };
  // Function to add a tag
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]); // Add tag to the list
      setTagInput(''); // Clear the input field
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // Remove tag from the list
  };
    // const onSubmit = async (data: any) => {
    //   try {
    //     const variantImagesToUpload = variantImages.flat(); 
    //   const uploadedImageUrls = await uploadMultiple({ files: variantImagesToUpload });
    //   console.log("images",uploadedImageUrls.data)
    //     const productData = {
    //       name: data.productName,
    //       description: data.productDescription,
    //       price: parseFloat(data.productPrice),
    //       discount: data?.discountPrice || 0,
    //       category: selectedCategories,
    //       stock: parseInt(data?.quantity || '0'),
    //       gender: selectedGender,
    //       tags: tags,
    //       Variants: sections.map((section, index) => ({
    //         color: data[`color_${index}`],
    //         size: data[`size_${index}`],
    //         stock: parseInt(data[`quantity_${index}`] || '0', 10),
    //         image: data[`image_${index}`],
            
    //         images:uploadedImageUrls.data || [],
    //         price: parseFloat(data[`price_${index}`]),
    //         discount: parseInt(data[`discount_${index}`] || '0', 10),
    //         material: data[`material_${index}`],
    //         comportment: data[`comportment_${index}`],
    //       })),
    //     };
    //     await createProduct(productData);

    //     Swal.fire({
    //       title: 'Success',
    //       text: 'product added successfully',
    //       icon: 'success',
    //     });
    //   } catch (error) {
    //     console.error('Failed to create product:', error);
    //   }
    // };
 
 
    const onSubmit = async (data: any) => {
      try {
        // Assuming variantImages is an array of arrays (one array per variant)
        const variantImagesToUpload = variantImages.flat();
        const uploadedImageUrls = await uploadMultiple({ files: variantImagesToUpload });
        console.log("images", uploadedImageUrls.data);
    
        // We need to track which images belong to which variant
        let imageIndex = 0;
        const variantImagesMap: any[] = [];
        
        // Create a map of variant index to its corresponding images
        for (let i = 0; i < variantImages.length; i++) {
          const variantImageCount = variantImages[i].length;
          variantImagesMap[i] = uploadedImageUrls.data.slice(imageIndex, imageIndex + variantImageCount);
          imageIndex += variantImageCount;
        }
    
        const productData = {
          name: data.productName,
          description: data.productDescription,
          price: parseFloat(data.productPrice),
          discount: data?.discountPrice || 0,
          category: selectedCategories,
          stock: parseInt(data?.quantity || '0'),
          gender: selectedGender,
          tags: tags,
          Variants: sections.map((section, index) => ({
            color: data[`color_${index}`],
            size: data[`size_${index}`],
            stock: parseInt(data[`quantity_${index}`] || '0', 10),
            image: data[`image_${index}`],
            // Now assign the correct images for this variant
            images: variantImagesMap[index] || [],
            price: parseFloat(data[`price_${index}`]),
            discount: parseInt(data[`discount_${index}`] || '0', 10),
            material: data[`material_${index}`],
            comportment: data[`comportment_${index}`],
          })),
        };
        
        await createProduct(productData);
        
        Swal.fire({
          title: 'Success',
          text: 'product added successfully',
          icon: 'success',
        });
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    };
    const handleError = (error: any) => {
    console.log('Form Errors: ', error);
  };
  return (
    <div className="w-full">
      <div className="w-full bg-slate-50 p-4">
        <Link className="flex gap-1 items-center" href={'/admin/products'}>
          {' '}
          <IoIosArrowRoundBack className="font-bold text-xl mt-1" /> back
        </Link>
        <h3 className="font-OpenSans text-primary text-2xl font-bold py-2">
          Add Product
        </h3>
        <div className="flex flex-wrap items-start shadow-md  w-full">
          <div className="lg:w-[70%] w-full rounded-[6px] bg-white shadow-lg p-4">
            <h3 className="font-OpenSans text-[16px] text-primary font-bold">
              Information
            </h3>
            <div className="w-full mt-2">
              <label
                htmlFor="username"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1 flex items-center font-bold">
                    Product Name{' '}
                    <span>
                      <FaStarOfLife className="text-red-500 w-2 h-2" />
                    </span>
                  </p>
                </div>
              </label>
              <Input
                type="text"
                placeholder="Product Name"
                name="productName"
                register={register as any}
                errors={errors as any}
                errorClass={'!text-[11px] -bottom-[19px]  '}
                className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
              />
            </div>
            <div className="w-full mt-2">
              <label
                htmlFor="description"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1 font-bold">Product Description</p>
                </div>
              </label>
              <textarea
                className="px-2 py-1 w-full shadow-revenueCard  rounded border-[1.5px] text-black focus:outline-none focus:border-blue-300 focus:border-[1px] placeholder:font-OpenSans placeholder:text-[#A1A7C4]}"
                placeholder="Product description"
                {...register('productDescription')}
              />
              {errors.productDescription && (
                <p className="text-red-500 text-xs">
                  {errors.productDescription.message}
                </p>
              )}
            </div>
            <hr className="border-primary my-8 border-[2px]" />
            <div className="w-full flex flex-wrap">
              <div className="md:w-1/2 w-full px-2 ">
                <label
                  htmlFor="username"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1 flex items-center font-bold">
                      Product Price
                      <span>
                        <FaStarOfLife className="text-red-500 w-2 h-2" />
                      </span>
                    </p>
                  </div>
                </label>
                <Input
                  type="text"
                  name="productPrice"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Enter Price"
                  className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="username"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1 font-bold">Discount Price</p>
                  </div>
                </label>
                <Input
                  type="text"
                  name="discountPrice"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Discount at percentage (%)"
                  className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                />
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="md:w-1/2 w-full px-2 ">
                <label
                  htmlFor="username"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1 font-bold ">Quantity</p>
                  </div>
                </label>
                <Input
                  type="text"
                  name="quantity"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Enter quantity"
                  className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                />
              </div>
              <div className="md:w-1/2 w-full px-2 ">
                <label
                  htmlFor="username"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1 flex items-center font-bold">
                      Gender{' '}
                      <span>
                        <FaStarOfLife className="text-red-500 w-2 h-2" />
                      </span>
                    </p>
                  </div>
                </label>
                <Dropdown
                  options={options}
                  placeholder="Filter"
                  onSelect={(selectedOption: string) => {
                    setSelectedGender(selectedOption);
                    setValue('gender', selectedOption);
                  }}
                  className="shadow-revenueCard border border-[#D9E1EC] rounded !w-full"
                  dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[7px] !md:w-0 !w-full !mt-0"
                  optionlabelClassName="!text-gray-600 !placeholder-gray-100"
                />
              </div>
            </div>

            <hr className="border-primary border-2 my-8" />

            <p className="font-OpenSans text-primary text-base font-bold pb-1">
              Option 1
            </p>
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="border-2 border-primary px-1 sm:p-1 rounded-lg mb-4"
              >
                <div className="w-full flex flex-wrap mb-4 mt-2">
                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Color</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`color_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Color"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>

                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Quantity</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`quantity_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Quantity"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-wrap my-4">
                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Size</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`size_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Size"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>

                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Price</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`price_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Price"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>

                  <div className="md:w-1/2 w-full px-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-normal font-OpenSans text-[#5A607F]"
                    >
                      <div className="flex items-center w-full gap-1">
                        <p className="my-1 font-bold">Discount Price</p>
                      </div>
                    </label>
                    <Input
                      type="number"
                      name={`discount_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Discount at percentage (%)"
                      min="0"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>

                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Compartment</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`comportment_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Comportment"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>

                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal text-[#5A607F]">
                      <div className="flex items-center gap-1">
                        <p className="my-1 font-bold">Material</p>
                      </div>
                    </label>
                    <Input
                      type="text"
                      name={`material_${index}`}
                      register={register as any}
                      errors={errors as any}
                      placeholder="Enter Material"
                      className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                    />
                  </div>
                </div>
                <div className="w-full mt-2">
                  {/* this is main image */}
                  <p className="mb-4 text-primary font-bold text-base flex items-center ">
                    Main Images
                    <span>
                      <FaStarOfLife className="text-red-500 w-2 h-2" />
                    </span>
                  </p>
                  <ImageUpload
                    control={control}
                    className="border-primary"
                    name={`image_${index}`}
                  />
                </div>
                {/* here also more images variant images  */}
                {/* <div className="w-full mt-2">
                    <p className="mb-4 text-primary font-bold text-base">Variant Images</p>
                    <div className='w-full flex flex-wrap gap-1'>
            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>

            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>

            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>

            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>

            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>

            <div className='border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px]'>
            <img src="/aboubag.jpg" alt="" className='w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover' />
            </div>
          </div>

                  </div> */}

                <div className="w-full mt-2">
                  <p className="mb-4 text-primary font-bold text-base">
                    Variant Images
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleVariantImageUpload(e, index)}
                    className="hidden"
                    id={`variant-file-input-${index}`}
                  />
                  <label
                    htmlFor={`variant-file-input-${index}`}
                    className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Upload Variant Images
                  </label>

                  {/* Display Uploaded Variant Images */}
                  <div className="w-full flex flex-wrap gap-1 mt-4">
                    {variantImages[index]?.map((file, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="border border-gray-300 rounded-lg p-1 max-h-[60px] xxs:min-h-[80px] relative group"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`variant-image-${imageIndex}`}
                          className="w-[50px] xxs:w-[60px] min-h-[50px] xxs:min-h-[70px] rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveVariantImage(index, imageIndex)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mb-1">
              <button
                type="button"
                onClick={handleAddMore}
                className="px-1 py-2 text-primary hover:underline font-medium rounded-lg"
              >
                Add More Color
              </button>
            </div>
          </div>
          <div className="lg:w-[30%] w-full lg:pl-2 mt-2 lg:mt-0 flex flex-col pb-2">
            <div className="bg-white rounded shadow mb-2">
              <h3 className="font-OpenSans text-[16px] py-3 px-3 font-bold text-primary flex items-center">
                Categories
                <span>
                  <FaStarOfLife className="text-red-500 w-2 h-2" />
                </span>
              </h3>
              <div className="flex my-4 flex-col items-start gap-1">
                {categories?.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center py-[6px] px-3 gap-2"
                  >
                    <input
                      className="w-4 h-4 cursor-pointer accent-primary transition-all duration-300 hover:scale-110"
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategories === category.id}
                      onChange={() =>
                        setSelectedCategories((item) =>
                          item === category.id ? '' : category.id
                        )
                      }
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-[#131523] font-OpenSans font-normal cursor-pointer text-base leading-3"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
                <p className="px-3 pt-4 text-[#1E5EFF] text-base font-OpenSans font-normal">
                  <Link
                    href={'/admin/categories'}
                    className="hover:underline text-primary font-[500]"
                  >
                    Create New
                  </Link>
                </p>
              </div>
            </div>
            <div className="bg-white rounded shadow my-4">
              <div className="w-11/12 px-3 py-2">
                <label
                  htmlFor="username"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1 font-bold text-primary">Add Tags</p>
                  </div>
                </label>
                <input
                  type="text"
                  value={tagInput}
                  name="tagInput"
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Enter Tag"
                  className="px-2 py-1 w-full shadow-revenueCard rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]"
                />
              </div>
              <div className="mt-2 px-3 py-2">
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-200 text-black px-3 py-1 rounded-md"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-red-500"
                        >
                          <Cross />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white shadow rounded mb-2">
              <h3 className="font-OpenSans text-[16px] py-3 px-3 font-bold text-primary">
                Seo Settings
              </h3>
              <div className="flex my-4 flex-col items-start gap-1">
                <div className="w-11/12 px-3 ">
                  <label
                    htmlFor="username"
                    className="text-sm font-normal font-OpenSans text-[#5A607F]"
                  >
                    <div className="flex items-center w-full gap-1">
                      <p className="my-1 font-bold">Title</p>
                    </div>
                  </label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="title"
                    register={register as any}
                    errors={errors as any}
                    className="shadow-revenueCard border border-[#D9E1EC] rounded w-full"
                  />
                </div>
                <div className="w-11/12 px-3 mt-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-normal font-OpenSans text-[#5A607F]"
                  >
                    <div className="flex items-center w-full gap-1">
                      <p className="my-1 font-bold">Description</p>
                    </div>
                  </label>
                  <textarea
                    className=" px-2 py-1 w-full shadow-revenueCard rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]}"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-end p-4 my-6 items-center">
            <button
              onClick={() => router.push('/admin/products')}
              className="border bg-slate-100 hover:bg-slate-300 border-gray-300 px-4 rounded py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit, handleError)}
              className="bg-primary text-white rounded px-4 py-2"
            >
              {isPending ? <Spinner /> : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;

//old code
// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import ImageUpload from '../../components/ImageUpload';
// import Input from '../../components/Input';
// // import ToggleSwitch from '../../components/ToggleButton';
// import { Cross } from '../../components/Icons';
// import { useCreateProduct } from '@/hooks/useProducts';
// import { useCategory } from '@/hooks/useCategory';
// import Swal from 'sweetalert2';
// import dynamic from 'next/dynamic';
// import Spinner from '@/app/components/LoadingSpinner';
// import { useRouter } from 'next/navigation';
// import Link from 'next/dist/client/link';
// import { IoIosArrowRoundBack } from 'react-icons/io';
// import { FaStarOfLife } from 'react-icons/fa';
// const Dropdown = dynamic(() => import('@/app/components/Dropdown'), {
//   ssr: false,
// });
// const productSchema = yup.object().shape({
//   productName: yup.string().required('Product name is required'),
//   productDescription: yup.string().optional(),
//   productPrice: yup
//     .number()
//     .typeError("Product price should be a number")
//     .nullable()
//     .transform((value, originalValue) =>
//       originalValue === "" ? null : value
//     ),
//   quantity: yup.number()
//   .typeError("Product price should be a number")
//   .nullable()
//   .transform((value, originalValue) =>
//     originalValue === "" ? null : value
//   ),
//   discountPrice: yup.number()
//   .typeError("Product price should be a number")
//   .nullable()
//   .transform((value, originalValue) =>
//     originalValue === "" ? null : value
//   ),
//   gender: yup.string().optional(),
//   category: yup
//     .array()
//     .min(1, 'Category is required')
//     .of(yup.string().required('Each category must be selected')),
//   // tags: yup.array().of(yup.string()),
//   // weight: yup.string(),
//   // country: yup.string().required('Country is required'),
// });

// const options = [
//   { label: 'Male', value: 'male' },
//   { label: 'Female', value: 'female' },
//   { label: 'Both', value: 'both' },
// ];
// const AddProduct = () => {
//   const router = useRouter();
//   // const [isChecked, setIsChecked] = useState(false);
//   // const [isChecked1, setIsChecked1] = useState(false);
//   const [sections, setSections] = useState([{ id: Date.now() }]);
//   const [selectedCategories, setSelectedCategories] = useState<string>('');
//   const [tags, setTags] = useState<string[]>([]); // state for storing tags
//   const [tagInput, setTagInput] = useState('');
//   const [selectedGender, setSelectedGender] = useState('');
//   const { mutateAsync: createProduct, isPending } = useCreateProduct();

//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(productSchema),
//   });

//   const { data: categories } = useCategory();

//   const handleAddMore = () => {
//     setSections([...sections, { id: Date.now() }]);
//   };

//   const handleRemoveSection = (index: number) => {
//     if (sections.length > 1) {
//       const updatedSections = sections.filter((_, idx) => idx !== index);
//       setSections(updatedSections);
//     }
//   };

//   const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTagInput(event.target.value);
//   };

//   const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault(); // Prevent form submission if within a form
//       handleAddTag(); // Add the tag on Enter
//     }
//   };
//   // Function to add a tag
//   const handleAddTag = () => {
//     if (tagInput && !tags.includes(tagInput)) {
//       setTags([...tags, tagInput]); // Add tag to the list
//       setTagInput(''); // Clear the input field
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove)); // Remove tag from the list
//   };
//   const onSubmit = async (data: any) => {
//     try {
//       const productData = {
//         name: data.productName,
//         description: data.productDescription,
//         price: parseFloat(data.productPrice),
//         discount: data?.discountPrice||0,
//         category: selectedCategories,
//         stock: parseInt(data?.quantity||'0'),
//         gender: selectedGender,
//         tags: tags,
//         Variants: sections.map((section, index) => ({
//           color: data[`color_${index}`],
//           size: data[`size_${index}`],
//           stock: parseInt(data[`quantity_${index}`] || '0', 10),
//           image: data[`image_${index}`],
//           price: parseFloat(data[`price_${index}`]),
//           discount: parseInt(data[`discount_${index}`] || '0', 10),
//         })),
//       };
//       await createProduct(productData);

//       Swal.fire({
//         title: 'Success',
//         text: 'product added successfully',
//         icon: 'success',
//       });
//     } catch (error) {
//       console.error('Failed to create product:', error);
//     }
//   };
//   const handleError = (error: any) => {
//     console.log('Form Errors: ', error);
//   };
//   return (
//     <div className="w-full">
//       <div className="w-full bg-slate-50 p-4">
//         <Link className="flex gap-1 items-center" href={'/admin/products'}>
//           {' '}
//           <IoIosArrowRoundBack className="font-bold text-xl mt-1" /> back
//         </Link>
//         <h3 className="font-OpenSans text-primary text-2xl font-bold py-2">Add Product</h3>
//         <div className="flex flex-wrap items-start shadow-md  w-full">
//           <div className="lg:w-[70%] w-full rounded-[6px] bg-white shadow-lg p-4">
//             <h3 className="font-OpenSans text-[16px] text-primary font-bold">Information</h3>
//             <div className="w-full mt-2">
//               <label
//                 htmlFor="username"
//                 className="text-sm font-normal font-OpenSans text-[#5A607F]"
//               >
//                 <div className="flex items-center w-full gap-1">
//                   <p className="my-1 flex items-center">Product Name <span><FaStarOfLife className='text-red-500 w-2 h-2' /></span></p>
//                 </div>
//               </label>
//               <Input
//                 type="text"
//                 placeholder="Product Name"
//                 name="productName"
//                 register={register as any}
//                 errors={errors as any}
//                 errorClass={'!text-[11px] -bottom-[19px] '}
//               />
//             </div>
//             <div className="w-full mt-2">
//               <label
//                 htmlFor="description"
//                 className="text-sm font-normal font-OpenSans text-[#5A607F]"
//               >
//                 <div className="flex items-center w-full gap-1">
//                   <p className="my-1">Product Description</p>
//                 </div>
//               </label>
//               <textarea
//                 className="px-2 py-1 w-full rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]}"
//                 placeholder="Product description"
//                 {...register('productDescription')}
//               />
//               {errors.productDescription && (
//                 <p className="text-red-500 text-xs">
//                   {errors.productDescription.message}
//                 </p>
//               )}
//             </div>
//             <hr className="border-[#D7DBEC] my-8" />
//             <hr className="border-[#D7DBEC] my-8" />
//             <div className="w-full flex flex-wrap">
//               <div className="md:w-1/2 w-full px-2 ">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1 flex items-center">Product Price<span><FaStarOfLife className='text-red-500 w-2 h-2' /></span></p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="productPrice"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Enter Price"
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Discount Price</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="discountPrice"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Discount at percentage (%)"
//                 />
//               </div>
//             </div>
//             <div className="w-full flex flex-wrap">
//               <div className="md:w-1/2 w-full px-2 ">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Quantity</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="quantity"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Enter quantity"
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2 ">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1 flex items-center">Gender <span><FaStarOfLife className='text-red-500 w-2 h-2' /></span></p>
//                   </div>
//                 </label>
//                 <Dropdown
//                   options={options}
//                   placeholder="Filter"
//                   onSelect={(selectedOption: string) => {
//                     setSelectedGender(selectedOption);
//                     setValue('gender', selectedOption);
//                   }}
//                   className="!w-full"
//                   dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[7px] !md:w-0 !w-full !mt-0"
//                   optionlabelClassName="!text-gray-600 !placeholder-gray-100"
//                 />
//               </div>
//             </div>
//             {/* <div className="my-6">
//               <ToggleSwitch
//                 label="Add tax for this product"
//                 bgColor="bg-[#D9E4FF]"
//                 checkedBgColor="bg-blue-500"
//                 dotColor="bg-white"
//                 textColor="text-black"
//                 checked={isChecked}
//                 onChange={(checked) => setIsChecked(checked)}
//               />
//             </div> */}
//             <hr className="border-[#D7DBEC] my-8" />
//             {/* <p className="font-OpenSans text-base font-bold">
//               Different Options
//             </p>
//             <div className="my-6">
//               <ToggleSwitch
//                 label="Add tax for this product"
//                 bgColor="bg-[#D9E4FF]"
//                 checkedBgColor="bg-blue-500"
//                 dotColor="bg-white"
//                 textColor="text-black"
//                 checked={isChecked1}
//                 onChange={(checked) => setIsChecked1(checked)}
//               />
//             </div> */}
//             <p className="font-OpenSans text-base font-bold">Option 1</p>
//             {sections.map((section, index) => (
//               <div key={section.id} className="border px-1 sm:p-4 rounded-lg mb-4">
//                 <div className="w-full flex flex-wrap mb-4 mt-2">
//                   <div className="md:w-1/2 w-full px-2">
//                     <label className="text-sm font-normal text-[#5A607F]">
//                       <div className="flex items-center gap-1">
//                         <p className="my-1">Color</p>
//                       </div>
//                     </label>
//                     <Input
//                       type="text"
//                       // name="color"
//                       name={`color_${index}`}
//                       register={register as any}
//                       errors={errors as any}
//                       placeholder="Enter Color"
//                     />
//                   </div>

//                   <div className="md:w-1/2 w-full px-2">
//                     <label className="text-sm font-normal text-[#5A607F]">
//                       <div className="flex items-center gap-1">
//                         <p className="my-1">Quantity</p>
//                       </div>
//                     </label>
//                     <Input
//                       type="text"
//                       // name="quantity"
//                       name={`quantity_${index}`}
//                       register={register as any}
//                       errors={errors as any}
//                       placeholder="Enter Quantity"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full flex flex-wrap my-4">
//                   <div className="md:w-1/2 w-full px-2">
//                     <label className="text-sm font-normal text-[#5A607F]">
//                       <div className="flex items-center gap-1">
//                         <p className="my-1">Size</p>
//                       </div>
//                     </label>
//                     <Input
//                       type="text"
//                       // name="size"
//                       name={`size_${index}`}
//                       register={register as any}
//                       errors={errors as any}
//                       placeholder="Enter Size"
//                     />
//                   </div>

//                   <div className="md:w-1/2 w-full px-2">
//                     <label className="text-sm font-normal text-[#5A607F]">
//                       <div className="flex items-center gap-1">
//                         <p className="my-1">Price</p>
//                       </div>
//                     </label>
//                     <Input
//                       type="text"
//                       // name="price"
//                       name={`price_${index}`}
//                       register={register as any}
//                       errors={errors as any}
//                       placeholder="Enter Price"
//                       // disabled={sections?.length < 2}
//                       // className="disabled:opacity-50"
//                     />
//                   </div>

//                   <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Discount Price</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="number"
//                   name={`discount_${index}`}
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Discount at percentage (%)"
//                   min='0'

//                 />
//               </div>

//                 </div>
//                 <div className="w-full mt-2">
//                   <p className="mb-4 font-bold text-base flex items-center">Images<span><FaStarOfLife className='text-red-500 w-2 h-2' /></span></p>
//                   <ImageUpload
//                     control={control}
//                     className=""
//                     name={`image_${index}`}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSection(index)}
//                   className="text-red-500 text-sm mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <div className="flex justify-between items-center mb-1">
//               <button
//                 type="button"
//                 onClick={handleAddMore}
//                 className="px-4 py-2 text-blue-700 rounded-lg"
//               >
//                 Add More Color
//               </button>
//             </div>
//             {/* <p className="font-OpenSans text-base font-bold mb-3">Option 1</p> */}
//             {/* <div className="w-full flex flex-wrap">
//               <div className="mg:w-1/2 w-full px-2 ">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Weight</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="weight"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Enter weight"
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2 ">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Country</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="country"
//                   placeholder="Enter Country"
//                   register={register as any}
//                   errors={errors as any}
//                 />
//               </div>
//             </div> */}
//           </div>
//           <div className="lg:w-[30%] w-full lg:pl-2 mt-2 lg:mt-0 flex flex-col pb-2">
//             <div className="bg-white rounded shadow mb-2">
//               <h3 className="font-OpenSans text-[16px] py-3 px-3 font-bold flex items-center">

//                 Categories
//                 <span><FaStarOfLife className='text-red-500 w-2 h-2' /></span>
//               </h3>
//               <div className="flex my-4 flex-col items-start gap-1">
//                 {categories?.map((category) => (
//                   <div
//                     key={category.id}
//                     className="flex items-center py-[6px] px-3 gap-2"
//                   >
//                     <input
//                       type="checkbox"
//                       id={`category-${category.id}`}
//                       className="cursor-pointer"
//                       checked={selectedCategories === category.id}
//                       onChange={() =>
//                         setSelectedCategories((item) =>
//                           item === category.id ? '' : category.id
//                         )
//                       }
//                     />
//                     <label
//                       htmlFor={`category-${category.id}`}
//                       className="text-[#131523] font-OpenSans font-normal cursor-pointer text-base leading-3"
//                     >
//                       {category.name}
//                     </label>
//                   </div>
//                 ))}
//                 <p className="px-3 pt-4 text-[#1E5EFF] text-base font-OpenSans font-normal">
//                   <Link href={'/admin/categories'}>Create New</Link>
//                 </p>
//               </div>
//             </div>
//             <div className="bg-white rounded shadow my-4">
//               <div className="w-11/12 px-3 py-2">
//                 <label
//                   htmlFor="username"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Add Tags</p>
//                   </div>
//                 </label>
//                 <input
//                   type="text"
//                   value={tagInput}
//                   name="tagInput"
//                   onChange={handleTagInputChange}
//                   onKeyDown={handleTagKeyDown}
//                   placeholder="Enter Tag"
//                   className="px-2 py-1 w-full rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]"
//                 />
//               </div>
//               <div className="mt-2 px-3 py-2">
//                 {tags.length > 0 && (
//                   <div className="flex flex-wrap gap-2">
//                     {tags.map((tag, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center bg-blue-200 text-black px-3 py-1 rounded-md"
//                       >
//                         <span>{tag}</span>
//                         <button
//                           onClick={() => handleRemoveTag(tag)}
//                           className="ml-2 text-red-500"
//                         >
//                           <Cross />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="bg-white shadow rounded mb-2">
//               <h3 className="font-OpenSans text-[16px] py-3 px-3 font-bold">
//                 Seo Settings
//               </h3>
//               <div className="flex my-4 flex-col items-start gap-1">
//                 <div className="w-11/12 px-3 ">
//                   <label
//                     htmlFor="username"
//                     className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                   >
//                     <div className="flex items-center w-full gap-1">
//                       <p className="my-1">Title</p>
//                     </div>
//                   </label>
//                   <Input
//                     type="text"
//                     name="title"
//                     placeholder=""
//                     register={register as any}
//                     errors={errors as any}
//                   />
//                 </div>
//                 <div className="w-11/12 px-3 mt-2">
//                   <label
//                     htmlFor="description"
//                     className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                   >
//                     <div className="flex items-center w-full gap-1">
//                       <p className="my-1">Description</p>
//                     </div>
//                   </label>
//                   <textarea
//                     className=" px-2 py-1 w-full rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]}"
//                     placeholder=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="w-full flex gap-4 justify-end p-4 my-6 items-center">
//             <button
//               onClick={() => router.push('/admin/products')}
//               className="border bg-slate-100 hover:bg-slate-300 border-gray-300 px-4 rounded py-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit(onSubmit, handleError)}
//               className="bg-primary text-white rounded px-4 py-2"
//             >
//               {isPending ? <Spinner /> : 'Submit'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddProduct;
