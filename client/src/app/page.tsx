/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PeopleReview from './components/PeopleReview';
import FeaturedProductCard from './components/FeaturedProductCard';
import Dropdown from './components/Dropdown';
import { FilterCategory } from '@/types/types';
import { useMemo, useState } from 'react';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import { Arrow } from './components/Icons';
import { useRouter } from 'next/navigation';
// import FeaturedHero from './components/FeaturedHero';
import HeroSection from './components/HeroSection';
import HomeFaq from './components/HomeFaq';
import ProductList from './components/ProductList';
import WhatWeDo from './components/WhatWeDo';
import { useProducts } from '@/hooks/useProducts';
import usePagination from '@/hooks/usePagination';
import { useCategory } from '@/hooks/useCategory';
import { useDebounce } from 'use-debounce';
// import { FaWhatsapp } from 'react-icons/fa';
import Layout from './components/MainLayout';
import BannerSilder from './components/BannerSilder';

export default function Home() {
  const { page, pageSize, setPage } = usePagination();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { data: categories } = useCategory();

  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[] | string;
  }>({});

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


  const [Order,setOrder]=useState("")
  const [OrderBy,setOrderBy]=useState("")

  const { data, isPending } = useProducts({
    page,
    pageSize,
    Order,
    OrderBy,
    ...(filter as any),
  });

  const { data: bestSeal, isLoading } = useProducts({
    Order: 'orders',
    OrderBy: 'DESC',
  });

  const sortedBestSeal = (bestSeal?.data || [])
    .sort((a, b) => {
      const stockA = a.Variants?.reduce(
        (sum, variant: any) => sum + variant.stock,
        0
      );
      const stockB = b.Variants?.reduce(
        (sum, variant: any) => sum + variant.stock,
        0
      );
      return (stockB ?? 0) - (stockA ?? 0); // Sort descending
    })
    .slice(0, 5);

 


  const router = useRouter();

  const veiwall = () => {
    router.push('/featured-store');
  };

  const viewProducts = () => {
    router?.push('/products');
  };
  const dynamicCategories = categories?.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));
  const options = [
    // { label: 'A to Z', value: 'name,ASC' },     
    // { label: 'Z to A', value: 'name,DESC' },     
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
    <div className="relative">
      <p className="text-center bg-gradient-to-r from-[#b9e1ef] to-[#78c3df] border-b text-sm py-1 border-primary text-primary font-semibold">
        {' '}
        Free Delivery Charges on Order Above 2999Rs !
      </p>
      <Layout showNavBar={false} discountcontent={false}>
        <HeroSection />
        <section className="w-full relative">
          <div className="pl-6 sm:pl-0 pr-6 sm:pr-10 md:pr-32">
            <div className="mt-5 flex justify-center">
              <h1 className="lg:text-5xl text-2xl xxs:text-3xl font-OpenSans font-medium leading-[65px] text-center whitespace-nowrap">
                Our Featured Store
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-x-10 md:mt-10 items-start">
              <div className="mt-1">
                <h1
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="md:text-center text-[#3734A9] text-2xl font-OpenSans font-semibold cursor-pointer"
                >
                  Filter
                </h1>
                <div
                  className={`absolute md:relative z-10 transition-all duration-300 ease-in-out ${
                    filtersVisible
                      ? 'opacity-100 transform translate-x-0 w-[250px] shadow-md'
                      : 'shadow-none opacity-0 transform -translate-x-full'
                  } md:opacity-100 md:transform-none md:block`}
                >
                  <Filters
                    categories={filterCategories as any}
                    activeFilters={activeFilters}
                    updateFilters={updateFilters}
                    isPending={isPending}
                  />
                </div>
              </div>

              {/* <div className="flex flex-col flex-grow">
              <div className="flex flex-wrap items-center justify-between "> */}
              <div className="w-full flex flex-col flex-grow justify-center">
                <div className="flex flex-wrap items-center sm:justify-between gap-10 sm:gap-0 ">
                  <div className="flex items-center gap-3">
                    <h1 className="text-[#3734A9] text-lg md:text-2xl font-OpenSans font-semibold leading-8">
                      New Styles
                    </h1>
                    {/* <h1 className="text-[#5B5B5B] text-sm font-OpenSans leading-[19px]">
                      Male & Female
                    </h1> */}
                  </div>
                  <div>
                    <Dropdown
                      options={options}
                      placeholder="Sort by: Popular"
                      onSelect={handleSelect}
                      dropdownClassName="text-gray-700"
                      optionClassName="text-gray-700"
                    />
                  </div>
                </div>

                <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 items-center gap-5 relative">
                  {(isPending
                    ? Array.from({ length: pageSize })
                    : data?.data
                  )?.map((item, index) => (
                    <FeaturedProductCard
                      key={index}
                      isPending={isPending}
                      {...(item as any)}
                    />
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:justify-items-end">
                  <div></div>
                  <Pagination
                    totalPages={data?.totalPages || 0}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                  <div className="flex justify-center">
                    <button
                      className="w-28 sm:w-auto mt-5 sm:mt-0 border-primary border rounded-[10px] px-3 py-1 flex items-center gap-5"
                      onClick={veiwall}
                    >
                      <h1 className="text-primary text-sm font-OpenSans leading-5">
                        Veiw all
                      </h1>
                      <span className="-rotate-90">
                        <Arrow />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-10 bg-primary rounded-[4px] flex"></span>
                    <h1 className="text-primary text-base font-poppins font-semibold leading-5">
                      This Month
                    </h1>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <h1 className="sm:text-2xl lg:text-4xl font-OpenSans font-semibold leading-[48px]">
                      Best Selling Products
                    </h1>
                    <button
                      onClick={viewProducts}
                      className="bg-primary rounded-md px-6 py-1.5 text-[#FAFAFA] text-base font-poppins font-medium"
                    >
                      Veiw All
                    </button>
                  </div>
                  <div className="mt-5">
                    <ProductList
                      products={sortedBestSeal}
                      className=""
                      isPending={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-0 lg:px-32 mt-20">
          {/* <FeaturedHero /> */}
          {/* <img src="/scasmkaosmk ksdckaskcm.png" alt="" /> */}
          <BannerSilder/>
        </div>

        <div className="mt-10 ">
          <WhatWeDo />
        </div>

        <div className="mt-10">
          <PeopleReview />
        </div>

        <HomeFaq />
      </Layout>
    </div>
  );
}
