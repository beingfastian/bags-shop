import { useProducts } from '@/hooks/useProducts';
import Image from 'next/image';
import React from 'react';

function TopProducts() {
  const { data } = useProducts({});

  
  const getAllVariantsWithProductInfo = () => {
    if (!data?.data) return [];
    
    return data.data.flatMap(product => 
      product.Variants.map(variant => ({
        id: variant.id,
        image: variant.image || '/Frame 7.png', 
        name: product.name,
        price: `${variant.price}`,
        unit: variant.stock,
        productId: product.id
      }))
    );
  };

  // Get top 7 variants by stock
  const topProducts = getAllVariantsWithProductInfo()
    .sort((a, b) => b.unit - a.unit)
    .slice(0, 7);

  return (
    <div className="bg-white shadow-revenueCard rounded-md px-6 py-3">
      <h2 className="text-[#131523] text-base font-OpenSans font-bold leading-6">
        Top Products by Units Sold
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[400px] mt-3">
          <thead>
            <tr className="text-left border-b-2 border-gray-200">
              <th className="text-[#5A607F] text-sm font-Inter">Name</th>
              <th className="px-4 text-[#5A607F] text-sm font-Inter">Price</th>
              <th className="px-4 text-[#5A607F] text-sm font-Inter">Units</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((item, index) => (
              <tr
                className="hover:bg-gray-50 border-b-2 border-gray-100"
                key={item.id || index}
              >
                <td className="text-[#131523] text-sm font-Inter font-medium flex items-center gap-2">
                  <span>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={36}
                      height={36}
                      unoptimized
                    />
                  </span>
                  {item.name}
                </td>
                <td className="py-3 px-4 text-[#131523] text-sm font-Inter">
                  {item.price}
                </td>
                <td className="px-4 text-[#131523] text-sm font-Inter">
                  {item.unit}
                </td>
              </tr>
            ))}
            {topProducts.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopProducts;