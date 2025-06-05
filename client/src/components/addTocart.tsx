// import { Cart } from '@/app/components/Icons';
// import { useCart } from '@/hooks/useAddToCart';
// import { Product } from '@/types/product';
// import React from 'react';

// interface Props {
//   data: Product;
// }
// function AddTocart({ data }: Props) {
//   const { openModal } = useCart();
//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => openModal(data)}
//         className="w-6 xxs:w-10 aspect-square rounded-full bg-[#3734A9] hover:bg-[#514dc8] ease-in-out duration-300 flex items-center justify-center"
//       >
//         <Cart height={20} width={20} />
//       </button>
//     </>
//   );
// }

// export default AddTocart;

import { Cart } from '@/app/components/Icons';
import { useCart } from '@/hooks/useAddToCart';
import { Product } from '@/types/product';
import React from 'react';

interface Props {
  data: Product;
  variant?: 'default' | 'second'; // Add the variant prop
  className?: string; // Optional additional classes
}

function AddToCart({ data, variant = 'default', className = '' }: Props) {
  const { openModal } = useCart();

  return (
    <>
      {variant === 'default' ? (
        // Default variant (round button)
        <button
          type="button"
          onClick={() => openModal(data)}
          className={`w-6 xxs:w-10 aspect-square rounded-full bg-[#3734A9] hover:bg-[#514dc8] ease-in-out duration-300 flex items-center justify-center ${className}`}
        >
          <Cart height={20} width={20} />
        </button>
      ) : (
        // Second variant (rectangular button with text and icon)
        <button
          type="button"
          onClick={() => openModal(data)}
          className={`px-3 py-2 bg-[#3734A9] hover:bg-[#514dc8] ease-in-out duration-300 flex items-center gap-2 rounded-md text-white font-semibold ${className}`}
        >
          <Cart height={20} width={20} />
          <span>Add to Cart</span>
        </button>
      )}
    </>
  );
}

export default AddToCart;
