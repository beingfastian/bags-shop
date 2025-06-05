'use client';

import React from 'react';

interface FilterCategory {
  title: string;
  type: 'checkbox' | 'radio' | 'range';
  options: { label: string; value: string }[];
}

interface FiltersProps {
  isPending?:boolean;
  categories: FilterCategory[];
  className?: string;
  activeFilters: { [key: string]: string[] | string };
  updateFilters: (
    category: string,
    value: string | string[] | undefined
  ) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  className,
  activeFilters,
  updateFilters,
}) => {
  const getActiveValues = (category: string): string[] | undefined => {
    return activeFilters[category]
      ? Array.isArray(activeFilters[category])
        ? activeFilters[category]
        : [activeFilters[category]]
      : undefined;
  };

  return (
    <div
      className={`bg-white shadow-lg rounded-tr-lg rounded-br-lg p-6 w-full max-w-sm ${className} border border-gray-200`}
    >
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">
            {category.title}
          </h3>
          <div className="w-full flex flex-col gap-3">
            {category.type === 'checkbox' &&
              category.options.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center cursor-pointer gap-3 hover:bg-gray-100 p-1 rounded-lg transition"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={
                      getActiveValues(category.title)?.includes(option.value) ||
                      false
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const currentValues =
                        getActiveValues(category.title) || [];
                      const newValues = isChecked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v) => v !== option.value);
                      updateFilters(category.title, newValues);
                    }}
                    className="form-checkbox cursor-pointer h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
                  />
                  <span className="text-gray-600 text-sm">{option.label}</span>
                </label>
              ))}
            {category.type === 'radio' &&
              category.options.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center cursor-pointer gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <input
                    type="radio"
                    name={category.title}
                    value={option.value}
                    checked={
                      getActiveValues(category.title)?.[0] === option.value
                    }
                    onChange={(e) =>
                      updateFilters(category.title, e.target.value)
                    }
                    className="form-radio h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
                  />
                  <span className="text-gray-600 text-sm">{option.label}</span>
                </label>
              ))}
            {category.type === 'range' && (
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="lg:w-20 w-20 p-2  rounded-lg focus:outline-none  text-gray-700"
                  onChange={(e) =>
                    updateFilters(category.title, [
                      e.target.value,
                      getActiveValues(category.title)?.[1] || '',
                    ])
                  }
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="lg:w-20 w-20 p-2  rounded-lg focus:outline-none text-gray-700"
                  onChange={(e) =>
                    updateFilters(category.title, [
                      getActiveValues(category.title)?.[0] || '',
                      e.target.value,
                    ])
                  }
                />
              </div>
            )}
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default Filters;

// 'use client';

// import React from 'react';

// interface FilterCategory {
//   title: string;
//   type: 'checkbox' | 'radio' | 'range';
//   options: { label: string; value: string }[];
// }

// interface FiltersProps {
//   categories: FilterCategory[];
//   className?: string;
//   activeFilters: { [key: string]: string[] | string };
//   updateFilters: (
//     category: string,
//     value: string | string[] | undefined
//   ) => void;
//   ispending?: boolean;
// }

// const Filters: React.FC<FiltersProps> = ({
//   categories,
//   className,
//   activeFilters,
//   updateFilters,
//   ispending,
// }) => {
//   const getActiveValues = (category: string): string[] | undefined => {
//     return activeFilters[category]
//       ? Array.isArray(activeFilters[category])
//         ? activeFilters[category]
//         : [activeFilters[category]]
//       : undefined;
//   };

//   if (ispending) {
//     // Skeleton loader
//     return (
//       <div
//         className={`bg-white shadow-lg rounded-tr-lg rounded-br-lg p-6 w-full max-w-sm ${className} border border-gray-200 animate-pulse`}
//       >
//         {Array.from({ length: 3 }).map((_, idx) => (
//           <div key={idx} className="mb-6">
//             <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
//             <div className="space-y-4">
//               {[...Array(5)].map((_, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
//                   <div className="h-4 bg-gray-200 w-24"></div>
//                 </div>
//               ))}
//             </div>
//             <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`bg-white shadow-lg rounded-tr-lg rounded-br-lg p-6 w-full max-w-sm ${className} border border-gray-200`}
//     >
//       {categories.map((category) => (
//         <div key={category.title} className="mb-6">
//           <h3 className="font-semibold text-lg text-gray-700 mb-3">
//             {category.title}
//           </h3>
//           <div className="w-full flex flex-col gap-3">
//             {category.type === 'checkbox' &&
//               category.options.map((option) => (
//                 <label
//                   key={option.value}
//                   className="inline-flex items-center cursor-pointer gap-3 hover:bg-gray-100 p-1 rounded-lg transition"
//                 >
//                   <input
//                     type="checkbox"
//                     value={option.value}
//                     checked={
//                       getActiveValues(category.title)?.includes(option.value) ||
//                       false
//                     }
//                     onChange={(e) => {
//                       const isChecked = e.target.checked;
//                       const currentValues =
//                         getActiveValues(category.title) || [];
//                       const newValues = isChecked
//                         ? [...currentValues, option.value]
//                         : currentValues.filter((v) => v !== option.value);
//                       updateFilters(category.title, newValues);
//                     }}
//                     className="form-checkbox cursor-pointer h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
//                   />
//                   <span className="text-gray-600 text-sm">{option.label}</span>
//                 </label>
//               ))}
//             {category.type === 'radio' &&
//               category.options.map((option) => (
//                 <label
//                   key={option.value}
//                   className="inline-flex items-center cursor-pointer gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
//                 >
//                   <input
//                     type="radio"
//                     name={category.title}
//                     value={option.value}
//                     checked={
//                       getActiveValues(category.title)?.[0] === option.value
//                     }
//                     onChange={(e) =>
//                       updateFilters(category.title, e.target.value)
//                     }
//                     className="form-radio h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
//                   />
//                   <span className="text-gray-600 text-sm">{option.label}</span>
//                 </label>
//               ))}
//             {category.type === 'range' && (
//               <div className="flex items-center gap-4">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   className="lg:w-20 w-20 p-2 rounded-lg focus:outline-none text-gray-700"
//                   onChange={(e) =>
//                     updateFilters(category.title, [
//                       e.target.value,
//                       getActiveValues(category.title)?.[1] || '',
//                     ])
//                   }
//                 />
//                 <span className="text-gray-500">-</span>
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   className="lg:w-20 w-20 p-2 rounded-lg focus:outline-none text-gray-700"
//                   onChange={(e) =>
//                     updateFilters(category.title, [
//                       getActiveValues(category.title)?.[0] || '',
//                       e.target.value,
//                     ])
//                   }
//                 />
//               </div>
//             )}
//           </div>
//           <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Filters;
