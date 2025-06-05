import React, { useEffect, useState } from 'react';

import { useProducts } from '@/hooks/useProducts';

import Pagination from './Pagination';
import SkeletonLoader from '../SkeletonProductsTable';
import { useRouter } from 'next/navigation';
import usePagination from '@/hooks/usePagination';

const ProductTable = ({
  onSelectionChange,
  onSelectedProducts,
  search,
  OrderBy,
  Order,
}: {
  onSelectionChange: (selected: string[]) => void;
  onSelectedProducts: (selected: string[]) => void;
  search: string;
  OrderBy: string;
  Order: string;

}) => {
  const router = useRouter();
  const { page, setPage } = usePagination();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { data, isLoading } = useProducts({
    page,
    pageSize: 10,
    search,
    OrderBy,
    Order,
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
 

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected]);

  useEffect(() => {
    onSelectedProducts(selectedProducts);
  }, [selectedProducts]);

  const handleRowClick = (id: string) => {
    router.push(`/admin/products/${id}`);
    console.log(id, 'iddd');
  };

 

  const handleProductCheckboxChange = (productId: string, variants: any[]) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId];

      setSelected((prevSelected) => {
        const variantIds = variants.map((variant) => variant.id);
        if (newSelectedProducts.includes(productId)) {
          return [...new Set([...prevSelected, ...variantIds])];
        } else {
          return prevSelected.filter((id) => !variantIds.includes(id));
        }
      });

      return newSelectedProducts;
    });
  };

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className="p-4" suppressHydrationWarning>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 text-left flex items-center space-x-2">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        const allProductIds = data?.data?.map((product) => product.id) || [];
                        const allVariantIds = data?.data?.flatMap((product) => product.Variants.map((variant) => variant.id)) || [];
                        setSelectedProducts(allProductIds);
                        setSelected(allVariantIds);
                      } else {
                        setSelectedProducts([]);
                        setSelected([]);
                      }
                    }}
                    type="checkbox"
                    className="w-4 h-4  accent-primary transition-all duration-300 hover:scale-110"
                  />
                  <span className="px-2 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
                    Product
                  </span>
                </th>

                <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
                  Inventory
                </th>
                <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
                  Colour
                </th>
                <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
                  Price
                </th>
                
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((product) => (
                <>
                  <tr>
                    <td colSpan={5} className="py-4  bg-gray-50 border-b">
                      <h1 className="text-gray-700 text-2xl font-bold">
                        <input
                          onChange={() => handleProductCheckboxChange(product.id, product.Variants)}
                          checked={selectedProducts.includes(product.id)}
                          type="checkbox"
                          className="w-4 h-4 mr-2 accent-primary transition-all duration-300 hover:scale-110"
                        />
                        {product.name}
                      </h1>
                    </td>
                  </tr>
                  {product.Variants.map((variant) => (
                    <tr
                      key={variant.id}
                      className="hover:bg-gray-50 border-b border-gray-300 cursor-pointer"
                      onClick={(e) => {
                        if ((e.target as HTMLInputElement).type !== 'checkbox') {
                          handleRowClick(product.id);
                        }
                      }}
                    >
                      <td className="py-2 px-3 flex items-center space-x-4">
                        <input
                          onChange={() =>
                            setSelected((items) =>
                              items.includes(variant.id)
                                ? items.filter((id) => id !== variant.id)
                                : [...items, variant.id]
                            )
                          }
                          checked={selected.includes(variant.id)}
                          type="checkbox"
                          className="w-4 h-4  accent-primary transition-all duration-300 hover:scale-110"
                        />
                        <img
                          src={variant.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <div className="font-semibold text-[#131523] font-OpenSans text-sm">
                            {product.name}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2 text-sm font-OpenSans text-[#131523] relative">
                        <span
                          className={`absolute inset-x-0 bottom-5 py-3 w-28 ${
                            variant.stock?.toString() === '0'
                              ? 'bg-[#E6E9F4] rounded-[4px]'
                              : ''
                          }`}
                        ></span>
                        <span className="relative cursor-pointer">
                          {variant.stock}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-[#131523] font-OpenSans text-sm cursor-pointer">
                        {variant.color}
                      </td>
                      <td className="px-4 py-2 text-sm text-[#131523] font-OpenSans cursor-pointer">
                        {variant.price}
                      </td>

                      
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between pb-3 pt-4">
            <Pagination
              totalPages={data?.totalPages || 0}
              currentPage={page}
              onPageChange={handlePageChange}
            />
            <button className="text-[#5A607F] text-sm font-Inter">
              {data?.totalItems || 0} Results
            </button>
          </div>
        </div>

       
      </div>
    </React.Suspense>
  );
};

export default ProductTable;


// 'use client';

// import Modal from '@/app/components/Modal';
// import { useVariants } from '@/hooks/useVariant';
// import { LucideClipboardEdit } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import UpdateProducts from '../UpdateProduct';
// // import SkeletonLoader from '../SkeletonProductsTable';

// const ProductTable = ({ onSelectionChange }: { onSelectionChange: (selected: string[]) => void }) => {
//   const { data } = useVariants();

//   const [selected, setSelected] = useState<string[]>([]);
//   const [editingProduct, setEditingProduct] = useState<{
//     name: string;
//     description: string;
//     price: string;
//     stock: string;
//     color: string;
//     sku?: string;
//     discount: string;
//     quantity: string;
//     gender: string;
//     image?: string;
//   } | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     onSelectionChange(selected); // Update parent with selected products
//   }, [selected]);

//     const handleEditClick = (product: any) => {
//     setEditingProduct(product);
//     setShowModal(true);
//   };

//     const handleCloseModal = () => {
//     setEditingProduct(null);
//     setShowModal(false);
//   };

//   const handleUpdateSubmit = (updatedProduct: any, imageFile?: File | null) => {
//     console.log('Updated Product:', updatedProduct, imageFile);
//     setEditingProduct(null);
//     setShowModal(false);
//   };

//   // if (isLoading) {
//   //   return <div><SkeletonLoader/></div>;
//   // }

//   return (
//     <React.Suspense fallback={<div>Loading...</div>}>
//       <div className="p-4" suppressHydrationWarning>
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border-collapse min-w-[700px]">
//             <thead>
//               <tr className="border-b border-gray-300">
//                 <th className="py-2 text-left flex items-center space-x-2">
//                   <input
//                     onChange={(e) => {
//                       if (e.target.checked) {
//                         setSelected(
//                           data?.data?.map((variant) => variant.id) || []
//                         );
//                       } else {
//                         setSelected([]);
//                       }
//                     }}
//                     type="checkbox"
//                     className="w-4 h-4  "
//                   />
//                   <span className="px-2 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans ">
//                     Product
//                   </span>
//                 </th>

//                 <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans ">
//                   Inventory
//                 </th>
//                 <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans ">
//                   Color
//                 </th>
//                 <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans ">
//                   Price
//                 </th>
//                 <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
//                   Eidt
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.data?.map((variant) => (
//                 <tr
//                   key={variant.id}
//                   className="hover:bg-gray-50 border-b border-gray-300 cursor-pointer"
//                 >
//                   <td className=" py-2 flex items-center space-x-4">
//                     <input
//                       onChange={() =>
//                         setSelected((items) =>
//                           items?.includes(variant?.id)
//                             ? items.filter((id) => id !== variant.id)
//                             : [...items, variant.id]
//                         )
//                       }
//                       checked={!!selected?.find((item) => item === variant?.id)}
//                       type="checkbox"
//                       className="w-4 h-4"
//                     />
//                     <img
//                       src={variant?.image}
//                       alt={variant?.Product?.name}
//                       className="w-12 h-12 object-cover rounded-md"
//                     />
//                     <div>
//                       <div className="font-semibold text-[#131523] font-OpenSans text-sm ">
//                         {variant?.Product?.name}
//                       </div>
//                       <div className="text-sm text-[#5A607F] font-Inter cursor-pointer">
//                         {variant?.Product?.name}
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-4 py-2 text-sm font-OpenSans text-[#131523] relative">
//                     <span
//                       className={`absolute inset-x-0 bottom-5 py-3 w-28 ${
//                         variant.stock?.toString() === '0'
//                           ? 'bg-[#E6E9F4] rounded-[4px]'
//                           : ''
//                       }`}
//                     ></span>
//                     <span className="relative cursor-pointer">
//                       {variant.stock || variant?.Product?.stock}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 text-[#131523] font-OpenSans text-sm cursor-pointer">
//                     {variant.color}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-[#131523] font-OpenSans cursor-pointer">
//                     {variant.price || variant?.Product?.price}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-[#131523] font-OpenSans cursor-pointer">
//                      <LucideClipboardEdit
//                         className="text-[#5A607F]"
//                         onClick={() => handleEditClick(variant)} // Call handleEditClick with the current variant
//                       />
//                     </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {showModal && editingProduct && (
//           <Modal show={showModal} onClose={handleCloseModal}>
//             <h2 className="text-3xl font-bold text-center mb-6">
//               Edit Product
//             </h2>
//             <UpdateProducts
//               product={editingProduct}
//               onClose={handleCloseModal}
//               onSubmit={handleUpdateSubmit}
//             />
//           </Modal>
//         )}
//       </div>
//     </React.Suspense>
//   );
// };

// export default ProductTable;
