// 'use client';
// import Image from 'next/image';
// import { Delete } from './Icons';
// import { useRouter } from 'next/navigation';
// import {
//   useCartItemQuantity,
//   useDeleteCartItem,
//   useGetCart,
// } from '@/hooks/useCart';
// import { CartItem } from '@/types/cart';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { applyDiscountToPrice } from '@/utils/discountUtils';
// import { toast, ToastContainer } from 'react-toastify';

// export default function CartTable() {
//   const [seleted, setSeleted] = useState<string | null>(null);
//   const [rowHeight, setRowHeight] = useState<number | null>(null);
//   const rowRef = useRef<HTMLTableRowElement>(null);
//   const router = useRouter();

//   const { data, isPending } = useGetCart();
//   const { mutateAsync, isPending: isUpdating } = useCartItemQuantity();
//   const { mutateAsync: mutateAsyncCartItem, isPending: isDeleting } =
//     useDeleteCartItem();

//   useEffect(() => {
//     if (rowRef.current) {
//       setRowHeight(rowRef.current.clientHeight);
//     }
//   }, [data]);

//   const orderNow = () => {
//     router?.push('/checkout');
//   };

//   const onClick = () => {
//     router?.push('/products');
//   };

//   const handleCartItemAction = useCallback(
//     async (action: 'increment' | 'decrement' | 'delete', item: CartItem) => {
//       try {
//         setSeleted(item.id);
//         if (action === 'increment') {
//           await mutateAsync({
//             variant_id: item.variant_id,
//             quantity: item.quantity + 1,
//           });
//         } else if (action === 'decrement') {
//           await mutateAsync({
//             variant_id: item.variant_id,
//             quantity: item.quantity - 1,
//           });
//         } else if (action === 'delete') {
//           await mutateAsyncCartItem(item.variant_id);
//         }
//       } catch (err) {
//         console.log(err);
//         alert('Something went wrong');
//       } finally {
//         setSeleted(null);
//       }
//     },
//     [mutateAsync, mutateAsyncCartItem]
//   );

//   return (
//     <>
//       <div className="px-6 sm:px-10 md:px-32 mt-10 overflow-x-auto">
//         <table className="w-full text-left border-collapse rounded-[5px] overflow-hidden min-w-[800px]">
//           <thead>
//             <tr className="bg-[#DAD9FF]">
//               <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
//                 Product
//               </th>
//               <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
//                 Price
//               </th>
//               <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
//                 Quantity
//               </th>
//               <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
//                 Total
//               </th>
//               <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px] text-end">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           {isPending ? (
//             <tbody>
//               {Array.from({ length: 4 })?.map((_, i) => (
//                 <tr key={i}>
//                   <td colSpan={5}>
//                     <div
//                       style={rowHeight ? { height: `${rowHeight}px` } : {}}
//                       className="w-full h-12 bg-gray-200 rounded-md animate-pulse"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           ) : (
//             <tbody>
//               {data?.items?.map((item) =>
//                 item?.id === seleted && (isDeleting || isUpdating) ? (
//                   <tr key={item.id}>
//                     <td colSpan={5}>
//                       <div
//                         style={rowHeight ? { height: `${rowHeight}px` } : {}}
//                         className="w-full bg-gray-200 rounded-md animate-pulse"
//                       />
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr
//                     ref={rowRef}
//                     key={item.id}
//                     className="bg-[#f3f2f2] hover:bg-gray-50"
//                   >
//                     <td className="py-4 px-4 flex items-center">
//                       <Image
//                         src={item?.Variant?.image || ''}
//                         alt={item?.Variant?.Product?.name || ''}
//                         width={0}
//                         height={0}
//                         className="w-12 h-12 rounded-md mr-2"
//                         unoptimized
//                       />
//                       <span className="text-[#444444] text-[14px] font-OpenSans leading-[21px]">
//                         {item?.Variant?.Product?.name}
//                       </span>
//                     </td>
//                     {/* <td className="py-4 px-6 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
//                       Rs:{' '}
//                       {
//                         applyDiscountToPrice(
//                           item?.price || 0,
//                           item?.Variant?.Product?.discount || 0
//                         )?.priceAfterDiscount
//                       }
//                     </td> */}
//                     <td className="py-4 px-6 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
//                       {(item?.Variant?.Product?.discount || 0) > 0 ? (
//                         <div className="flex flex-col">
//                           <span className="line-through text-gray-500 text-[13px]">
//                             Rs: {item?.price || 0}
//                           </span>
//                           <span>
//                             Rs:{' '}
//                             {
//                               applyDiscountToPrice(
//                                 item?.price || 0,
//                                 item?.Variant?.Product?.discount || 0
//                               )?.priceAfterDiscount.toFixed(2)
//                             }
//                           </span>
//                         </div>
//                       ) : (
//                         <span>Rs: {item?.price.toFixed(2) || 0}</span>
//                       )}
//                     </td>

//                     <td className="py-4 px-6">
//                       <div className="flex items-center justify-center bg-white border border-[#E9E9E9] rounded-[5px] w-20">
//                         <button
//                           onClick={() =>
//                             handleCartItemAction('decrement', item)
//                           }
//                           className="text-lg"
//                           aria-label={`Decrement quantity of ${item?.Variant?.Product?.name}`}
//                         >
//                           -
//                         </button>
//                         <span className="mx-3 text-[#444444] text-[14px] font-SegoeUi leading-[21px]">
//                           {item?.quantity || 0}
//                         </span>
//                         <button
//                           onClick={() => {
//                             if (item?.quantity >= (item?.Variant?.stock ?? 0)) {
//                               toast.error("Stock limit reached!");
//                               return;
//                             }
//                             handleCartItemAction('increment', item)
//                           }}
//                           className="text-lg"
//                           // disabled={item?.quantity >= (item?.Variant?.stock ?? 0)}
//                           aria-label={`Increment quantity of ${item?.Variant?.Product?.name}`}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 w-40 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
//                       Rs:{' '}
//                       {
//                         applyDiscountToPrice(
//                           item?.total_price || 0,
//                           item?.Variant?.Product?.discount || 0
//                         )?.priceAfterDiscount.toFixed(2)
//                       }
//                     </td>
//                     <td className="py-4 px-6 ">
//                       <button
//                         onClick={() =>{
//                           handleCartItemAction('delete', item)}}
//                         className=" flex justify-end items-center ml-auto "
//                         aria-label={`Delete ${item?.Variant?.Product?.name}`}
//                       >
//                         <Delete />
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           )}
//         </table>
//       </div>
//       <div className="flex items-center justify-between mt-3 px-6 sm:px-10 md:px-32">
//         <button
//           onClick={onClick}
//           className="text-[#444444] text-[14px] font-SegoeUi leading-[21px] border-b-2 border-[#444444]"
//         >
//           Continue Shopping
//         </button>
//         <button
//           onClick={orderNow}
//           className="bg-primary rounded-md px-6 py-1.5 text-[#FFF] text-sm font-OpenSans font-medium leading-7"
//         >
//           Check Out
//         </button>
//       </div>
//       <ToastContainer/>
//     </>
//   );
// }



'use client';
import Image from 'next/image';
import { Delete } from './Icons';
import { useRouter } from 'next/navigation';
import {
  useCartItemQuantity,
  useDeleteCartItem,
  useGetCart,
} from '@/hooks/useCart';
import { CartItem } from '@/types/cart';
import { useEffect, useRef, useState, useCallback } from 'react';
import { applyDiscountToPrice } from '@/utils/discountUtils';
import { toast, ToastContainer } from 'react-toastify';

export default function CartTable() {
  const [seleted, setSeleted] = useState<string | null>(null);
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const router = useRouter();

  const { data, isPending } = useGetCart();
  const { mutateAsync, isPending: isUpdating } = useCartItemQuantity();
  const { mutateAsync: mutateAsyncCartItem, isPending: isDeleting } =
    useDeleteCartItem();

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(rowRef.current.clientHeight);
    }
  }, [data]);

  const orderNow = () => {
    router?.push('/checkout');
  };

  const onClick = () => {
    router?.push('/products');
  };

  const handleCartItemAction = useCallback(
    async (action: 'increment' | 'decrement' | 'delete', item: CartItem) => {
      try {
        setSeleted(item.id);
        if (action === 'increment') {
          await mutateAsync({
            variant_id: item.variant_id,
            quantity: item.quantity + 1,
          });
        } else if (action === 'decrement') {
          await mutateAsync({
            variant_id: item.variant_id,
            quantity: item.quantity - 1,
          });
        } else if (action === 'delete') {
          await mutateAsyncCartItem(item.variant_id);
        }
      } catch (err) {
        console.log(err);
        // alert('Something went wrong');
        toast.warning('Quantity cannot be less than 1');
      } finally {
        setSeleted(null);
      }
    },
    [mutateAsync, mutateAsyncCartItem]
  );

  return (
    <>
      <div className="px-6 sm:px-10 md:px-32 mt-10 overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-[5px] overflow-hidden min-w-[800px]">
          <thead>
            <tr className="bg-[#DAD9FF]">
              <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
                Product
              </th>
              <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
                Price
              </th>
              <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
                Quantity
              </th>
              <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px]">
                Total
              </th>
              <th className="py-3 px-6 text-[#444444] text-[15px] font-OpenSans font-semibold leading-[15px] text-end">
                Action
              </th>
            </tr>
          </thead>

          {isPending ? (
            <tbody>
              {Array.from({ length: 4 })?.map((_, i) => (
                <tr key={i}>
                  <td colSpan={5}>
                    <div
                      style={rowHeight ? { height: `${rowHeight}px` } : {}}
                      className="w-full h-12 bg-gray-200 rounded-md animate-pulse"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {data?.items?.map((item) =>
                item?.id === seleted && (isDeleting || isUpdating) ? (
                  <tr key={item.id}>
                    <td colSpan={5}>
                      <div
                        style={rowHeight ? { height: `${rowHeight}px` } : {}}
                        className="w-full bg-gray-200 rounded-md animate-pulse"
                      />
                    </td>
                  </tr>
                ) : (
                  <tr
                    ref={rowRef}
                    key={item.id}
                    className="bg-[#f3f2f2] hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 flex items-center">
                      <Image
                        src={item?.Variant?.image || ''}
                        alt={item?.Variant?.Product?.name || ''}
                        width={0}
                        height={0}
                        className="w-12 h-12 rounded-md mr-2"
                        unoptimized
                      />
                      <span className="text-[#444444] text-[14px] font-OpenSans leading-[21px]">
                        {item?.Variant?.Product?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
                      {(item?.Variant?.discount || 0) > 0 ? (
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500 text-[13px]">
                            Rs: {item?.price || 0}
                          </span>
                          <span>
                            Rs:{' '}
                            {
                              applyDiscountToPrice(
                                item?.price || 0,
                                item?.Variant?.discount || 0
                              )?.priceAfterDiscount.toFixed(2)
                            }
                          </span>
                        </div>
                      ) : (
                        <span>Rs: {item?.price.toFixed(2) || 0}</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center bg-white border border-[#E9E9E9] rounded-[5px] w-20">
                        <button
                          onClick={() =>
                            handleCartItemAction('decrement', item)
                          }
                          className="text-lg"
                          aria-label={`Decrement quantity of ${item?.Variant?.Product?.name}`}
                        >
                          -
                        </button>
                        <span className="mx-3 text-[#444444] text-[14px] font-SegoeUi leading-[21px]">
                          {item?.quantity || 0}
                        </span>
                        <button
                          onClick={() => {
                            if (item?.quantity >= (item?.Variant?.stock ?? 0)) {
                              toast.error("Stock limit reached!");
                              return;
                            }
                            handleCartItemAction('increment', item)
                          }}
                          className="text-lg"
                          aria-label={`Increment quantity of ${item?.Variant?.Product?.name}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 w-40 text-[#555555] text-[15px] font-OpenSans font-semibold leading-[22px]">
                      {(item?.Variant?.discount || 0) > 0 ? (
                        <span>
                          Rs:{' '}
                          {
                            applyDiscountToPrice(
                              item?.total_price || 0,
                              item?.Variant?.discount || 0
                            )?.priceAfterDiscount.toFixed(2)
                          }
                        </span>
                      ) : (
                        <span>Rs: {item?.total_price.toFixed(2) || 0}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 ">
                      <button
                        onClick={() =>{
                          handleCartItemAction('delete', item)}}
                        className=" flex justify-end items-center ml-auto "
                        aria-label={`Delete ${item?.Variant?.Product?.name}`}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex items-center justify-between mt-3 px-6 sm:px-10 md:px-32">
        <button
          onClick={onClick}
          className="text-[#444444] text-[14px] font-SegoeUi leading-[21px] border-b-2 border-[#444444]"
        >
          Continue Shopping
        </button>
        <button
          onClick={orderNow}
          className="bg-primary rounded-md px-6 py-1.5 text-[#FFF] text-sm font-OpenSans font-medium leading-7"
        >
          Check Out
        </button>
      </div>
      <ToastContainer/>
    </>
  );
}