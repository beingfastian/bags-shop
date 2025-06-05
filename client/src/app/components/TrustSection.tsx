import Image from 'next/image';

export default function TrustSection() {
  return (
    <div className="bg-[#EBFAFF] py-8 w-5/6 px-2 rounded-lg">
      <div className="text-center">
        <h2 className="text-[22px] font-medium !dark:text-black">
          Over{' '}
          <span className="text-[#3734A9] font-extrabold text-4xl">30+</span>{' '}
          style enthusiasts trust Luxe Carry for their perfect Bags &
          Stationery.
        </h2>
      </div>
      <div className="flex justify-center gap-8 mt-6 flex-wrap">
        <div className="flex items-center">
          <Image
            src="/camelmountain-removebg-preview.png"
            alt="NextFashion"
            width={31}
            height={31}
          />
          <span className="ml-2 font-medium text-[#63866A]">CamelMountain</span>
        </div>
        <div className="flex items-center">
          <Image
            src="/yalonghk-removebg-preview.png"
            alt="FashionForAll"
            width={31}
            height={31}
          />
          <span className="ml-2 font-medium text-[#3734A9]">Yalonghk</span>
        </div>
        <div className="flex items-center">
          <Image
            src="/Swiger-removebg-preview.png"
            alt="Queen Closet"
            width={31}
            height={31}
          />
          <span className="ml-2 font-medium text-[#B71DBA]">Swissgear </span>
        </div>
        <div className="flex items-center">
          <Image
            src="/shop.samsonite-removebg-preview.png"
            alt="FashionForAll"
            width={31}
            height={31}
          />
          <span className="ml-2 font-medium text-[#2C7B98]">Samsonite</span>
        </div>
        <div className="flex items-center">
          <Image
            src="/lenovo-removebg-preview.png"
            alt="Queen Closet"
            width={40}
            height={40}
          />
          <span className="ml-2 font-medium text-[#BAAA1D]">Lenovo </span>
        </div>
      </div>
    </div>
  );
}
