// import { Product } from '@/types/product';
// import ProductCard from './ProductCard';

// interface ProductListProps {
//   products: Product[] | null | undefined;
//   className?: string;
//   isPending?: boolean;
// }

// const ProductList: React.FC<ProductListProps> = ({
//   products,
//   className,
//   isPending,
// }) => {
//   return (
//     <div className="flex flex-wrap justify-start gap-y-10">
//       {(products || Array.from({ length: 10 }))?.map((product , index) => (
//         <div
//           key={index}
//           className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3"
//         >
//           <ProductCard
//             {...product}
//             className={className}
//             isPending={isPending}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[] | null | undefined;
  className?: string;
  isPending?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  className,
  isPending,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 px-3">
      {( !isPending ? products : Array.from({ length: 10 }))?.map((product, index) => (
        <div key={index}>
          <ProductCard
            {...product as any}
            className={className}
            isPending={isPending}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
