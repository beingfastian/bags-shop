// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// import dynamic from 'next/dynamic';
// import { useDeleteVariant } from '@/hooks/useVariant';
// import { useDeleteProduct } from '@/hooks/useProducts';

// // Dynamically import components with SSR disabled
// const SearchIcon = dynamic(() => import('./_components/SearchIcon'), {
//   ssr: false,
// });

// const ProductTable = React.lazy(() => import('./_components/ProductTable'));

// const AddIcon = dynamic(
//   () => import('./_components/Icons').then((mod) => mod.AddIcon),
//   { ssr: false }
// );
// const DeleteIcon = dynamic(
//   () => import('./_components/Icons').then((mod) => mod.DeleteIcon),
//   { ssr: false }
// );

// const Dropdown = dynamic(() => import('@/app/components/Dropdown'), {
//   ssr: false,
// });

// function Page() {
//   const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

//   const { mutate: deletevariant } = useDeleteVariant();
//   const handleVariantDelete = () => {
//     if (selectedVariants.length > 0) {
//       deletevariant(selectedVariants, {
//         onSuccess: () => {
//           // alert('Products deleted successfully!');
//           setSelectedVariants([]);
//         },
//         onError: () => {
//           alert('Failed to delete products. Please try again.');
//         },
//       });
//     } else {
//       // alert('No products selected.');
//     }
//   };


//   const { mutate: deleteProduct } = useDeleteProduct();
//   const handleDelete = () => {
//     if (selectedProducts.length > 0) {
//       deleteProduct(selectedProducts, {
//         onSuccess: () => {
//           // alert('Products deleted successfully!');
//           setSelectedProducts([]);
//         },
//         onError: () => {
//           alert('Failed to delete products. Please try again.');
//         },
//       });
//     } else {
//       // alert('No products selected.');
//     }
//   };

//   const [Order, setOrder] = useState('');
//   const [OrderBy, setOrderBy] = useState('');

//   const options = [
//     // { label: 'A to Z', value: 'name,ASC' },
//     // { label: 'Z to A', value: 'name,DESC' },
//     { label: 'sale', value: 'discount,DESC' },
//     { label: 'Latest', value: 'createdAt,DESC' },
//     { label: 'High to Low', value: 'price,DESC' },
//     { label: 'Low to High', value: 'price,ASC' },
//   ];

//   const handleSelect = (selectedValue: string) => {
//     console.log('Selected:', selectedValue);

//     const [orderBy, order] = selectedValue.split(',');

//     setOrder(order);
//     setOrderBy(orderBy);
//   };
//   const router = useRouter();

//   const handleRoute = () => {
//     router.push('/admin/add-products');
//   };

//   return (
//     <div className="px-6">
//       <div className="flex flex-wrap justify-between py-5">
//         <h1 className="text-[#131523] text-[24px] font-OpenSans font-bold ">
//           Products
//         </h1>

//         <button className="bg-[#1E5EFF] rounded-[4px] px-1 py-1 md:px-4 md:py-2 text-white   text-sm md:text-base font-OpenSans flex items-center md:space-x-1 font-semibold ">
//           <AddIcon />
//           <span onClick={handleRoute}> Add Product</span>
//         </button>
//       </div>
//       <div className=" bg-white px-6 py-1 ">
//         <div className="w-full flex  md:gap-0 gap-2 md:items-center justify-between mt-4">
//           <div className="w-full flex flex-wrap items-center gap-3 px-4 ">
//             <Dropdown
//               options={options}
//               placeholder="Filter"
//               onSelect={handleSelect}
//               dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[10px] !md:w-0 !w-full !mt-0"
//               optionClassName="text-gray-700 "
//               optionlabelClassName="!text-black !placeholder-gray-100"
//             />
//             <SearchIcon />
//           </div>
//           <div
//             onClick={()=>[handleVariantDelete(), handleDelete()]}
//             className="cursor-pointer flex items-center justify-center rounded-sm border w-10 h-10"
//           >
//             <DeleteIcon />
//           </div>
//         </div>
//         <ProductTable onSelectionChange={setSelectedVariants} onSelectedProducts={setSelectedProducts} />
//       </div>
//     </div>
//   );
// }

// export default Page;






/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useDeleteVariant } from '@/hooks/useVariant';
import { useDeleteProduct } from '@/hooks/useProducts';
import Modal from '@/app/components/Modal'; // Import the Modal component

// Dynamically import components with SSR disabled
const SearchIcon = dynamic(() => import('./_components/SearchIcon'), {
  ssr: false,
});

const ProductTable = React.lazy(() => import('./_components/ProductTable'));

const AddIcon = dynamic(
  () => import('./_components/Icons').then((mod) => mod.AddIcon),
  { ssr: false }
);
const DeleteIcon = dynamic(
  () => import('./_components/Icons').then((mod) => mod.DeleteIcon),
  { ssr: false }
);

const Dropdown = dynamic(() => import('@/app/components/Dropdown'), {
  ssr: false,
});

function Page() {

  const searchParams = useSearchParams();
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false); // State for delete confirmation modal
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State for delete success modal

  const { mutate: deletevariant } = useDeleteVariant();
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  const handleVariantDelete = () => {
    if (selectedVariants.length > 0) {
      deletevariant(selectedVariants, {

        onSuccess: () => {
          setSelectedVariants([]); // Clear selected variants
          setShowDeleteConfirmationModal(false); // Close confirmation modal
          setShowDeleteSuccessModal(true); // Show success modal
        },

        onError: () => {
          // alert('Failed to delete variants. Please try again.');
        },
      });
    }
  };

  const handleDelete = () => {
    if (selectedProducts.length > 0) {
      deleteProduct(selectedProducts, {
        onSuccess: () => {
          setSelectedProducts([]); // Clear selected products
          setShowDeleteConfirmationModal(false); // Close confirmation modal
          setShowDeleteSuccessModal(true); // Show success modal
        },
        onError: () => {
          alert('Failed to delete products. Please try again.');
        },
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedVariants.length > 0 || selectedProducts.length > 0) {
      setShowDeleteConfirmationModal(true); // Show confirmation modal
    } else {
      alert('No items selected.');
    }
  };

 

  const confirmDelete = () => {
    handleVariantDelete(); // Delete selected variants
    handleDelete(); // Delete selected products
  };

  const handleCloseDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(false); // Close confirmation modal
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false); // Close success modal
  };

  const [Order, setOrder] = useState('');
  const [OrderBy, setOrderBy] = useState('');

  const options = [
    { label: 'sale', value: 'discount,DESC' },
    { label: 'Latest', value: 'createdAt,DESC' },
    { label: 'High to Low', value: 'price,DESC' },
    { label: 'Low to High', value: 'price,ASC' },
  ];

  const handleSelect = (selectedValue: string) => {
    const [orderBy, order] = selectedValue.split(',');
    setOrder(order);
    setOrderBy(orderBy);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('orderBy', orderBy);
    newSearchParams.set('order', order);
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSearch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('search', value);
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleRoute = () => {
    router.push('/admin/add-products');
  };

  return (
    <div className="px-2 md:px-6">
      <div className="flex flex-wrap justify-between py-5 ">
        <h1 className="text-[#131523] text-[24px] font-OpenSans font-bold ">
          Products
        </h1>

        <button className="bg-primary rounded-[4px] px-1 py-1 md:px-4 md:py-2 text-white text-sm md:text-base font-OpenSans flex items-center md:space-x-1 font-semibold">
          <AddIcon />
          <span onClick={handleRoute}> Add Product</span>
        </button>
      </div>
      <div className="bg-white  sm:px-0  pl-2 xxs:pl-0 py-1">
        <div className="w-full flex md:gap-0 gap-2 md:items-center justify-between mt-4 pr-2 ">
          <div className="w-full flex flex-wrap items-center gap-3 px-4">
          {/* <Dropdown
              options={options}
              placeholder="Filter"
              onSelect={handleSelect}
              dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[10px] !md:w-0 !w-full !mt-0"
              optionClassName="text-gray-700"
              optionlabelClassName="!text-black !placeholder-gray-100"
            /> */}
            <SearchIcon onSearch={handleSearch}/>
          </div>
          <div className='w-full flex justify-end'>
          <div
            onClick={handleDeleteClick}
            className="cursor-pointer rounded-lg pr-1 flex items-center justify-center border  h-10"
          >
            <DeleteIcon /> Delete
          </div>
          </div>
        </div>
        <ProductTable
          onSelectionChange={setSelectedVariants}
          onSelectedProducts={setSelectedProducts}
          search={searchParams.get('search') || ''}
          OrderBy={searchParams.get('orderBy') || ''}
          Order={searchParams.get('order') || ''}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmationModal && (
        <Modal show={showDeleteConfirmationModal} onClose={handleCloseDeleteConfirmationModal}>
          <div className="text-center w-[200px] sm:w-full">
            <h2 className=" font-bold mb-4 text-xs xxs:text-base">Confirm Delete</h2>
            <p className="mb-6 text-xs xxs:text-base">Are you sure you want to delete the selected items?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handleCloseDeleteConfirmationModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccessModal && (
        <Modal show={showDeleteSuccessModal} onClose={handleCloseDeleteSuccessModal}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Items Deleted Successfully!</h2>
            <p className="mb-6">The selected items have been deleted.</p>
            <button
              onClick={handleCloseDeleteSuccessModal}
              className="bg-[#1E5EFF] text-white px-6 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Page;