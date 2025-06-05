/* eslint-disable @next/next/no-img-element */
'use client';
import { Edit, Trash2 } from 'lucide-react';
// import UpdateProducts from '../UpdateProduct';
import { useState } from 'react';

import { useSingleProduct } from '@/hooks/useProducts';
import { useParams, useRouter } from 'next/navigation';
import UpdateProduct from '../_components/update';
import UpdateVariant from '../_components/updateVariant';
import { Variant } from '@/types/product';
import { applyDiscountToPrice } from '@/utils/discountUtils';
import { BackIcon } from '../../dashboard/_components/Icons';
import AddVariant from '../_components/addVariant';
// import Router from 'next/router';

// Component
const ProductDetail: React.FC = () => {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [isAdd, setAdd] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  const { id } = useParams();
  const { data, refetch } = useSingleProduct(id?.toString() || '');

  const router = useRouter();
  const onProductClose = () => {
    refetch();
    setShowModal(false);
  };
  const onVaraintClose = () => {
    refetch();
    setVariant(null);
    setAdd(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleVariantSelect = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedVariants(data?.Variants?.map((v) => v.id) || []);
    } else {
      setSelectedVariants([]);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting variants:', selectedVariants);
    setSelectedVariants([]);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div
          className="max-w-[70px] cursor-pointer flex  py-1 px-2 border rounded bg-primary  justify-center items-center text-xl"
          onClick={() => router.push('/admin/products')}
        >
          <BackIcon /> <p className="mb-1 text-white text-xs sm:text-sm md:text-lg">back</p>
        </div>
        {/* Main Product Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col xxs:flex-row items-center  justify-between mb-6">
            <button
                className="px-2 xxs:px-6 block xxs:hidden text-xs xxs:text-sm sm:text-base py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleOpenModal}
              >
                Edit Product
              </button>
              <h1 className="text-lg sm:text-3xl font-bold text-gray-900">{data?.name}</h1>
              <button
                className="px-2 xxs:px-6 hidden xxs:block text-xs xxs:text-sm sm:text-base py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleOpenModal}
              >
                Edit Product
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={
                    data?.Variants?.[0]?.image || '/bagsimage/bag image 4.webp'
                  }
                  alt="Product Variant"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {data?.description}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    {/* <h3 className="text-sm font-medium text-gray-500">Price</h3> */}
                    <td className="py-4  text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
                      {(data?.discount || 0) > 0 ? (
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-900">
                            Rs:{' '}
                            {applyDiscountToPrice(
                              data?.price || 0,
                              data?.discount || 0
                            )?.priceAfterDiscount?.toFixed(2)}
                          </span>
                          <span className="line-through text-gray-500 text-[13px] font-bold">
                            Rs: {data?.price.toFixed(2) || 0}
                          </span>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">
                          Rs. {data?.price}
                        </p>
                        // <span>Rs: {data?.price?.toFixed(2) || 0}</span>
                      )}
                    </td>
                    {/* <p className="text-2xl font-bold text-gray-900">
                    Rs. {data?.price}
                  </p> */}
                  </div>

                  <div className=" flex items-center">
                    <h3 className="text-sm font-medium text-gray-500">Stock:</h3>
                    <p className="text-lg ">
                      {data?.stock}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Category
                    </h3>
                    <p className="text-lg text-gray-900">
                      {data?.Category?.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Gender
                    </h3>
                    <p className="text-lg text-gray-900">{data?.gender}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">
                      Discount
                    </h3>
                    <p className="text-lg text-gray-900">{data?.discount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
              <h2 className="xxs:text-2xl sm:text-2xl font-bold text-gray-900">
                Product Variants
              </h2>
              <div className="flex space-x-4">
                {selectedVariants?.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="px-1 xxs:px-2 md:px-4 text-[10px] xxs:text-xs sm:text-sm md:text-base py-1 xxs:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="h-3 xxs:h-5 w-3 xxs:w-5" />
                    <span>Delete Selected ({selectedVariants.length})</span>
                  </button>
                )}
                <button
                  className="px-1 xxs:px-2 md:px-4 text-[10px] xxs:text-xs sm:text-sm py-2 md:text-base bg-primary text-white rounded-lg hover:bg-blue-950 transition-colors"
                  onClick={() => setAdd(true)}
                >
                  Add Variant
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        onChange={handleSelectAll}
                        checked={
                          selectedVariants.length === data?.Variants?.length
                        }
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.Variants?.map((variant) => (
                    <tr
                      key={variant?.id}
                      className={`hover:bg-gray-50 ${
                        selectedVariants?.includes(variant?.id)
                          ? 'bg-blue-50'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedVariants.includes(variant.id)}
                          onChange={() => handleVariantSelect(variant.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={variant?.image}
                          alt={'variantImage'}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                          {variant?.color}
                        </span>
                      </td>
                      <td className="px-6 py-4">{data?.name || 'Name'}</td>
                      <td className="py-4 px-6 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
                        {(variant?.discount || 0) > 0 ? (
                          <div className="flex flex-col">
                            <span className="line-through text-gray-500 text-[13px]">
                              Rs: {variant?.price || 0}
                            </span>
                            <span>
                              Rs:{' '}
                              {applyDiscountToPrice(
                                variant?.price || 0,
                                variant?.discount || 0
                              )?.priceAfterDiscount.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>Rs: {variant?.price?.toFixed(2) || 0}</span>
                        )}
                      </td>
                      {/* <td className="px-6 py-4">Rs. {variant?.price || 0}</td> */}
                      <td className="px-6 py-4">{variant?.stock}</td>
                      <td className="px-6 py-4">{variant?.discount}</td>
                      <td
                        onClick={() => setVariant(variant)}
                        className="px-6 py-4 cursor-pointer"
                      >
                      <Edit/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Product Modal */}
        {showModal && (
          <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white mx-10 rounded-lg max-w-2xl w-full ">
              <div className="p-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary">
                    Edit Product
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <UpdateProduct onClose={onProductClose} data={data} />
              </div>
            </div>
          </div>
        )}
        {variant ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Variant
                  </h2>
                  <button
                    onClick={() => setVariant(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <UpdateVariant onClose={onVaraintClose} data={variant} />
              </div>
            </div>
          </div>
        ) : null}
        {isAdd ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
              <div className="p-3">
                <div className="flex justify-between items-center ">
                  <h2 className="text-2xl font-bold text-primary">
                    Add Variant
                  </h2>
                  <button
                    onClick={() => setAdd(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <AddVariant
                  onClose={onVaraintClose}
                  product_id={data?.id || ''}
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-red-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Delete Variants
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Are you sure you want to delete {selectedVariants.length}{' '}
                      selected variants? This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
