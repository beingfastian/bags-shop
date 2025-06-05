/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FilterCategory } from '@/types/types';
import React, { useMemo, useState } from 'react';
import Filters from '../components/Filters';
import ProductList from '../components/ProductList';
import Dropdown from '../components/Dropdown';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import { ArrowLeft } from '../components/Icons';
import { useProducts } from '@/hooks/useProducts';
import usePagination from '@/hooks/usePagination';
import { useCategory } from '@/hooks/useCategory';
import { useDebounce } from 'use-debounce';
import Layout from '../components/MainLayout';
import { useRouter } from 'next/navigation';
import BannerSilder from '../components/BannerSilder';
const ProductPage: React.FC = () => {
  const router = useRouter();
  const { page, pageSize, setPage } = usePagination();

  const { data: categories } = useCategory();
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const [filtersVisible, setFiltersVisible] = useState(false);

  const options = [
    // { label: 'A to Z', value: 'name,ASC' },     
    // { label: 'Z to A', value: 'name,DESC' },  
    { label: 'Sale', value: 'discount,DESC' },   
    { label: 'Latest', value: 'createdAt,DESC' }, 
    { label: 'High to Low', value: 'price,DESC' }, 
    { label: 'Low to High', value: 'price,ASC' },
  ];
  
  const handleSelect = (selectedValue: string) => {
    console.log('Selected:', selectedValue);
  
    const [orderBy,order] = selectedValue.split(',');
  
    setOrder(orderBy);
    setOrderBy(order);
  };
  const dynamicCategories = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const filterCategories: FilterCategory[] = [
    {
      title: 'Gender',
      type: 'checkbox',
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
    },
    {
      title: 'Category',
      type: 'checkbox',
      options: dynamicCategories || [],
    },
    {
      title: 'Price',
      type: 'range',
      options: [],
    },
  ];


  const [Order,setOrder]=useState("")
  const [OrderBy,setOrderBy]=useState("")

  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[] | string;
  }>({});

  const updateFilters = (
    category: string,
    value: string | string[] | undefined
  ) => {
    setActiveFilters((prevFilters: any) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  const debouncedFilters = useDebounce(activeFilters, 500);

  const filter = useMemo(
    () => ({
      categories: activeFilters['Category'] as string[],
      min: parseInt(activeFilters['Price']?.[0].toString()) || null,
      max: parseInt(activeFilters['Price']?.[1].toString()) || null,
      gender: activeFilters['Gender'] || null,
    }),
    [debouncedFilters]
  );

  const { data: products, isPending } = useProducts({
    page,
    pageSize,
    Order,
    OrderBy,



    ...(filter as any),
  });

  return (
    <Layout>
      <div className="w-full">
        <div className="px-8 sm:px-10 md:px-32 mt-5">
        
          <div className="mt-5 hidden md:block">
            <div className="bg-[#F8F8FF] lg:w-[55%] rounded-[10px] p-4 flex items-center gap-4">
              <h1
                className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium"
                onClick={() => router.push('/')} // Correct way to navigate
              >
                Home
              </h1>
              <ArrowLeft />
              <h1
                className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
                onClick={() => router.push('/products')} // Correct navigation
              >
                Flat off Collection
              </h1>
            
            </div>
          </div>
        </div>
        <div className="mt-5 px-8 sm:px-16 md:px-32">
          {/* <FeaturedHero /> */}
           <BannerSilder/>
        </div>
        <Image
          src="Element.png"
          alt=""
          width={0}
          height={0}
          className="w-20 absolute right-0"
          unoptimized
        />
        <h1 className="lg:text-5xl mt-8 text-3xl font-OpenSans font-bold leading-[65px] text-center whitespace-nowrap">
          Flat Off Collection
        </h1>
        <div className="flex flex-wrap items-center justify-between px-10 mt-10">
          <div className="w-[20%]">
            <p
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="text-[#3734A9]  text-lg md:text-2xl font-OpenSans font-semibold leading-8"
            >
              Filters
            </p>
          </div>
          <div className="w-1/3 flex items-start justify-start ">
            <h1 className="text-[#3734A9] text-lg md:text-2xl font-OpenSans font-semibold leading-8">
              New Styles
            </h1>
            {/* <h1 className="text-[#5B5B5B] text-sm font-OpenSans leading-[19px]">
              Male & Female
            </h1> */}
          </div>
          <div className="w-1/3 flex justify-center  pr-0">
            <Dropdown
              options={options}
              placeholder="Sort by: Popular"
              onSelect={handleSelect}
              dropdownClassName="text-gray-700"
              optionClassName="text-gray-700"
            />
          </div>
        </div>
        <div className="flex relative mt-4">
          <div
            className={`w-1/5 absolute md:relative z-10 transition-all duration-300 ease-in-out ${
              filtersVisible
                ? 'opacity-100 transform translate-x-0 w-[250px] shadow-md'
                : 'shadow-none opacity-0 transform -translate-x-full'
            } md:opacity-100 md:transform-none md:block`}
          >
            <Filters
              categories={filterCategories as any}
              activeFilters={activeFilters}
              updateFilters={updateFilters}
              // ispending={isPending}
            />
          </div>

          <div className="w-full md:w-3/4 p-4 lg:pr-28 pr-0">
            <ProductList
              products={products?.data as any}
              isPending={isPending}
            />
            <div className="mt-10">
              <Pagination
                totalPages={products?.totalPages || 0}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
