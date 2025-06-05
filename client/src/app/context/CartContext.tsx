/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';
import Modal from '@/components/Modal';
import { useAddToCart } from '@/hooks/useCart';
import { CartPayload } from '@/types/cart';
import Swal from 'sweetalert2';
import { useTransition } from 'react-spring';
import { applyDiscountToPrice } from '@/utils/discountUtils';

interface CartContextType {
  openModal: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setProduct] = useState<Product | null>(null);
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-40px)' },
  });

  const openModal = (product: Product) => {
    setProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProduct(null);
  };

  const { mutateAsync } = useAddToCart();

  const onSubmit = async ({ quantity, variant_id }: CartPayload) => {
    try {
      setLoadingVariant(variant_id);
      const response = await mutateAsync({ quantity, variant_id });
      Swal.fire({
        title: 'Success',
        text: response?.message || 'added',
        icon: 'success',
      });
      closeModal();
      setLoadingVariant(null);
    } catch (err: any) {
      Swal.fire({
        title: 'Error',
        text: 'Please First Register Then Order Products Please',
        icon: 'error',
      });
      setLoadingVariant(null);
    }
  };

  return (
    <CartContext.Provider value={{ openModal }}>
      {children}
      {transitions((style, item) =>
        item && data ? (
          <Modal
            key="modal"
            className="lg:!w-1/2 md:!w-3/4 !w-11/12 z-50"
            style={style as any}
            show={isOpen}
            onClose={closeModal}
          >
            <div className="px-6 pb-5 max-w-lg w-full mx-auto bg-white md:max-w-2xl">
              <h2 className="text-lg font-bold text-primary mb-4">
                Select Product Variant
              </h2>
              <div className="grid gap-4">
                {data?.Variants?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-lg transition"
                  >
                    <img
                      src={item?.image}
                      alt={data?.name}
                      className="w-20 h-20 object-cover rounded-md mb-2 md:mb-0 md:mr-4"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-medium text-gray-700">
                        {data?.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        Rs.
                        {applyDiscountToPrice(
                          item?.price || data?.price,
                         item?.discount || data?.discount
                        )?.priceAfterDiscount.toFixed(2)}
                        {item?.discount || data?.discount ? (
                          <span className="text-xs text-red-500 line-through ml-2">
                            Rs. {(item?.price || data?.price).toFixed(2)}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <div>
                      {/* <button
                        type="button"
                        onClick={() =>
                          onSubmit({ variant_id: item?.id, quantity: 1 })
                        }
                        className={`relative font-bold w-32 flex justify-center items-center text-center py-3 text-white bg-blue-600 rounded-md overflow-hidden group
                          ${item?.stock !== null && item?.stock <= 0 ? 'bg-gray-200 text-black cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                        disabled={item?.stock !== null && item?.stock <= 0} // Disable the button if stock is <= 2
                      >
                        <span className="absolute inset-0 bg-blue-700 transform translate-y-full transition-all group-hover:translate-y-0"></span>

                        {item?.stock !== null && item?.stock <= 0 ? (
                          <span className="btn-text relative z-10 transition-all">
                            Out of Stock
                          </span>
                        ) : (
                          <span className="btn-text relative z-10 transition-all">
                            {loadingVariant === item?.id ? (
                              <div className="w-6 h-6 border-4 border-t-transparent border-white animate-spin rounded-full"></div>
                            ) : (
                              'Add to Cart'
                            )}
                          </span>
                        )}
                      </button> */}

                      <div className="relative group">
                        <button
                          type="button"
                          onClick={() =>
                            onSubmit({ variant_id: item?.id, quantity: 1 })
                          }
                          className={`relative font-bold w-32 flex justify-center items-center text-center py-3 rounded-md overflow-hidden group transition-all
      ${item?.stock !== null && item?.stock <= 0 ? 'bg-gray-300 text-black cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                          disabled={item?.stock !== null && item?.stock <= 0}
                        >
                          <span
                            className={`absolute inset-0 transform translate-y-full transition-all ${item?.stock !== null && item?.stock <= 0 ? '' : 'bg-blue-700 group-hover:translate-y-0'}`}
                          ></span>

                          {item?.stock !== null && item?.stock <= 0 ? (
                            <span className="btn-text relative z-10 transition-all">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="btn-text relative z-10 transition-all">
                              {loadingVariant === item?.id ? (
                                <div className="w-6 h-6 border-4 border-t-transparent border-white animate-spin rounded-full"></div>
                              ) : (
                                'Add to Cart'
                              )}
                            </span>
                          )}
                        </button>

                        {/* Tooltip for Out of Stock */}
                        {item?.stock !== null && item?.stock <= 0 && (
                          <div className="w-28 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:flex items-center bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            ❌ This item is out of stock
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        ) : null
      )}
    </CartContext.Provider>
  );
};

export default CartContext;
