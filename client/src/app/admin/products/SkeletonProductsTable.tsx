// SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <table className="table-auto w-full border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 text-left flex items-center space-x-2">
              <div className="w-16 h-6 bg-gray-200 rounded-md"></div>
            </th>
            <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
              <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
            </th>
            <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
              <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
            </th>
            <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
              <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
            </th>
            <th className="px-4 py-2 text-left text-[#5A607F] text-sm font-bold font-OpenSans">
              <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b border-gray-300 cursor-pointer">
              <td className="py-2 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                <div className="w-32 h-6 bg-gray-200 rounded-md"></div>
              </td>
              <td className="px-4 py-2 text-sm font-OpenSans text-[#131523] relative">
                <div className="w-28 h-6 bg-gray-200 rounded-md"></div>
              </td>
              <td className="px-4 py-2 text-[#131523] font-OpenSans text-sm cursor-pointer">
                <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
              </td>
              <td className="px-4 py-2 text-sm text-[#131523] font-OpenSans cursor-pointer">
                <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
              </td>
              <td className="px-4 py-2 text-sm text-[#131523] font-OpenSans cursor-pointer">
                <div className="w-24 h-6 bg-gray-200 rounded-md"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonLoader;
