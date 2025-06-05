// 'use client';
// import FeaturedProductCard from '@/app/components/FeaturedProductCard';
// import { useProducts } from '@/hooks/useProducts';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// import { useDebounce } from 'use-debounce';

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// function Search({ open, onClose }: Props) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   useEffect(() => {
//     const currentPathname = window.location.pathname;
//     const currentSearchParams = new URLSearchParams(searchParams.toString());

//     if (debouncedSearchQuery) {
//       currentSearchParams.set('search', debouncedSearchQuery);
//     } else {
//       currentSearchParams.delete('search');
//     }

//     router.push(`${currentPathname}?${currentSearchParams.toString()}`, {
//       scroll: true,
//     });
//   }, [debouncedSearchQuery, router, searchParams]);

//   const { data, isPending } = useProducts({ search: searchQuery });

//     return open ? (
//       <div className="md:w-11/12  md:mx-auto fixed inset-0 z-20 top-4 px-4 overflow-y-auto ">
//         <div className=" w-full z-10 sticky top-0 flex items-center">
//           <input
//             value={searchQuery}
//             onChange={handleSearchChange}
//             type="text"
//             placeholder="Search..."
//             className="w-full py-2 px-4  rounded-lg border border-gray-300 focus:outline-none  min-w-0 md:h-1/2"
//           />
//           <button
//             onClick={onClose}
//             className="absolute right-4 text-gray-500 hover:text-gray-700 px-3"
//           >
//             <AiOutlineClose size={24} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 bg-white">
//           {(isPending ? Array.from({ length: 10 }) : data?.data)?.map(
//             (item, index) => (
//               <FeaturedProductCard
//                 key={index}
//                 isPending={isPending}
//                 {...(item as any)}
//               />
//             )
//           )}
//         </div>
//       </div>
//     ) : null;

// }

// export default Search;

'use client';
import FeaturedProductCard from '@/app/components/FeaturedProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDebounce } from 'use-debounce';

interface Props {
  open: boolean;
  onClose: () => void;
}

function Search({ open, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const currentPathname = window.location.pathname;
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedSearchQuery) {
      currentSearchParams.set('search', debouncedSearchQuery);
    } else {
      currentSearchParams.delete('search');
    }

    router.push(`${currentPathname}?${currentSearchParams.toString()}`, {
      scroll: true,
    });
  }, [debouncedSearchQuery, router, searchParams]);

  const { data, isPending } = useProducts({ search: searchQuery });

  return open ? (
    <div className="md:w-full  md:mx-auto fixed inset-0 z-20 top-0 overflow-y-auto ">
      <div className=" w-full z-10 sticky top-0 flex items-center px-4 bg-white">
        <input
          value={searchQuery}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4  rounded-lg border-2 border-[#3734a9] focus:outline-none  min-w-0 md:h-1/2"
        />
        <button
          onClick={onClose}
          className="absolute right-4 text-[#3734a9] hover:text-gray-700 px-3"
        >
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  bg-white !z-20 px-5 py-4">
        {(isPending ? Array.from({ length: 10 }) : data?.data)?.map(
          (item, index) => (
            <FeaturedProductCard
              key={index}
              isPending={isPending}
              {...(item as any)}
            />
          )
        )}
      </div>
    </div>
  ) : null;
}

export default Search;
