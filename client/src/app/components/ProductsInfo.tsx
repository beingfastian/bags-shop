import React, { useState } from 'react';
import { MessageIcons } from './Icons';
import { Product } from '@/types/product';
import { FaShareAlt } from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import { useClipboard } from 'use-clipboard-copy';
import Modal from './Modal';
import AddToCart from '@/components/addTocart';

type ProductInfoProps = {
  productName: string;
  data: Product | null | undefined;
  location: string;
  onContactUs: () => void;
  onChat: () => void;
  onBuyNow: () => void;
  isPending?: boolean;
};

const SkeletonBox: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`relative overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer"></div>
  </div>
);

const ProductsInfo: React.FC<ProductInfoProps> = ({
  productName,
  data,
  onContactUs,
  onChat,
  isPending,
}) => {
  const { copy } = useClipboard();
  const [isModalOpen, setModalOpen] = useState(false);

  const currentProductUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const toggleModal = () => setModalOpen((prev) => !prev);

  if (isPending) {
    return (
      <div className="w-full flex flex-col gap-y-6 animate-fadeIn">
        <SkeletonBox className="h-8 w-2/3 rounded-lg" />

        <div className="w-full bg-gray-100 rounded-lg p-4 space-y-4">
          <SkeletonBox className="h-6 w-1/4 rounded-md mb-3" />
          <div className="grid grid-cols-2 gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <SkeletonBox key={index} className="h-8 w-full rounded-md" />
              ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <SkeletonBox className="h-10 w-full rounded-full" />
          <SkeletonBox className="h-10 w-full rounded-full" />
        </div>

        <div className="max-w-2xl p-5 mx-auto rounded-lg bg-gray-100 space-y-4">
          <SkeletonBox className="h-6 w-1/3 rounded-md" />
          <SkeletonBox className="h-6 w-1/4 rounded-md" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <SkeletonBox className="h-12 w-full rounded-lg" />
          <SkeletonBox className="h-12 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      <p className="text-2xl font-bold">Name: {productName}</p>
      <div className="text-[#3734A9] text-xl font-bold">
        <div className="text-[#3734A9] text-xl font-bold">
          <p className="text-[#3734A9] text-xl font-bold mb-2">Variants</p>
          
          <div className='overflow-x-auto'>
           <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 text-sm font-semibold text-left px-4 py-2">
                Colour
              </th>
              <th className="border border-gray-300 text-sm font-semibold text-left px-4 py-2">
                Price
              </th>
              {data?.Variants?.some((item) => item?.size) && (
                <th className="border border-gray-300 text-sm font-semibold text-left px-4 py-2">
                  Size
                </th>
              )}
              <th className="border border-gray-300 text-sm font-semibold text-left px-4 py-2">
              Compartment
              </th>
              <th className="border border-gray-300 text-sm font-semibold text-left px-4 py-2">
                Material
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.Variants?.map((item, index) => {
              // Calculate discounted price for each variant
              const variantPrice = item?.price || data?.price || 0;
              const variantDiscount = item?.discount || data?.discount || 0;
              const discountedPrice = variantDiscount > 0 
                ? Math.floor(variantPrice * (1 - variantDiscount / 100))
                : variantPrice;
              
              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                    {item?.color}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-[12px] text-gray-800 ">
                    Rs. {discountedPrice}
                    {variantDiscount > 0 && (
                      <span className="text-[10px] text-red-500 line-through ml-2">
                        Rs. {variantPrice}
                      </span>
                    )}
                  </td>
                  {item?.size && (
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                      {item?.size?.split(',')?.map((e, i) => (
                        <p key={i} className="text-xs text-left">
                          {e}
                        </p>
                      ))}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                    {item?.comportment }
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  {item?.material}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          className="bg-[rgb(55,52,169)] rounded-full w-full sm:min-w-[142px] px-0 sm:px-0 py-1 h-[44px] text-[#FFFFFF] text-sm sm:text-base font-bold"
          onClick={onContactUs}
        >
          Contact us
        </button>
        <button
          className="flex items-center sm:gap-2 justify-center w-full rounded-full px-2 sm:px-0 sm:min-w-[268px] py-1 h-[44px] text-sm sm:text-base text-[#3734A9] font-bold border-[#3734A9] border-[2px]"
          onClick={onChat}
        >
          <MessageIcons /> Chat with Store owner
        </button>
      </div>
      <div className="w-full flex flex-col items-start sm:flex-row gap-2 sm:gap-8">
        <AddToCart
          data={data as any}
          variant="second"
          className={'w-full py-3 flex justify-center'}
        />
      </div>

      <div className="flex justify-end items-end gap-6 mt-4">
        <button
          onClick={toggleModal}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <FaShareAlt size={20} />
          Share
        </button>
      </div>

      <Modal show={isModalOpen} onClose={toggleModal}>
        <h2 className="text-xl font-bold mb-4 text-center text-primary">
          Share This Product
        </h2>
        <div className="flex justify-around text-2xl text-blue-600 gap-5">
          <FacebookShareButton
            url={currentProductUrl}
            className="cursor-pointer"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={currentProductUrl}
            className="cursor-pointer"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={currentProductUrl}
            className="cursor-pointer"
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={currentProductUrl}
            subject="Check this out!"
            body="Hey, check out this product!"
            className="cursor-pointer"
          >
            <EmailIcon size={40} round />
          </EmailShareButton>

          <button
            onClick={() => {
              copy(currentProductUrl);
              alert('Link copied to clipboard!');
            }}
            className="bg-gray-200 p-2  rounded-full"
          >
            <p className="!text-xs !boreder-2 !border-black text-primary">
              Copy Link
            </p>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsInfo;