/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { ArrowLeft } from '../components/Icons';
import FeaturedHero from '../components/FeaturedHero';
import FeaturedProductCard from '../components/FeaturedProductCard';
import Image from 'next/image';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import { FilterCategory } from '@/types/types';
import Dropdown from '../components/Dropdown';
import { useProducts } from '@/hooks/useProducts';
import { useCategory } from '@/hooks/useCategory';
import Layout from '../components/MainLayout';

function Page() {
  const { data, isPending } = useProducts({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { data: categories } = useCategory();
  const totalPages = 28;

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelect = (selectedOption: string) => {
    console.log('Selected:', selectedOption);
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];

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

  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[] | string;
  }>({});

  // Function to update active filters in the parent state
  const updateFilters = (
    category: string,
    value: string | string[] | undefined
  ) => {
    setActiveFilters((prevFilters: any) => ({
      ...prevFilters,
      [category]: value,
    }));
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="px-6 sm:px-10 md:px-32 mt-5">
          <div className="bg-[#F8F8FF] lg:w-[45%] rounded-[10px] p-4 flex items-center gap-4">
            <h1 className="text-xs md:text-xl text-[#3734A9] font-OpenSans ">
              Home
            </h1>
            <ArrowLeft />
            <h1 className="text-xs md:text-xl text-[#3734A9] font-OpenSans whitespace-nowrap">
              Featured Store
            </h1>
            <ArrowLeft />
            <h1 className="text-xs md:text-xl text-[#BABABA] font-OpenSans whitespace-nowrap">
              Product details
            </h1>
          </div>
        </div>
        <div className="mt-5 px-6 sm:px-10 md:px-32">
          <FeaturedHero />
        </div>
        <section className="w-full relative">
          <div className="pl-6 sm:pl-0 pr-6 sm:pr-10 md:pr-32">
            <div className="mt-5 ">
              <h1 className="lg:text-5xl text-3xl font-OpenSans font-bold leading-[65px] text-center whitespace-nowrap">
                our featured store
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-x-10 md:mt-10">
              <div>
                <h1
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="md:text-center text-[#3734A9] text-2xl font-OpenSans font-semibold cursor-pointer"
                >
                  Filter
                </h1>
                <div
                  className={`absolute md:relative z-10 ${
                    filtersVisible ? 'block w-[250px]' : 'hidden'
                  } md:block mt-10 md:mt-6`}
                >
                  <Filters
                    categories={filterCategories as any}
                    activeFilters={activeFilters}
                    updateFilters={updateFilters}
                  />
                </div>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex flex-wrap items-center justify-between ">
                  <Image
                    src="Element.png"
                    alt=""
                    width={0}
                    height={0}
                    className="w-20 absolute right-0"
                    unoptimized
                  />

                  <div className="flex items-center gap-8">
                    <h1 className="text-[#3734A9] text-lg md:text-2xl font-OpenSans font-semibold leading-8">
                      New Styles
                    </h1>
                    {/* <h1 className="text-[#5B5B5B] text-sm font-OpenSans leading-[19px]">
                      Male & Female
                    </h1> */}
                  </div>
                  <Dropdown
                    options={options}
                    placeholder="Sort by: Popular"
                    onSelect={handleSelect}
                    dropdownClassName="text-gray-700"
                    optionClassName="text-gray-700"
                  />
                </div>

                <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-5 relative">
                  {data?.data?.map((item, index) => (
                    <FeaturedProductCard
                      key={index}
                      {...item}
                      isPending={isPending}
                    />
                  ))}
                  <Image
                    src="Element (1).png"
                    alt=""
                    width={0}
                    height={0}
                    className="w-10 absolute -left-20 bottom-0"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Page;
