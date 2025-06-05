// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function BannerSilder() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };
//   return (
//     <Slider {...settings}>
//       <div >
//         <img src="/Group 85278.png" alt="" className="object-cover p-5" />
//       </div>
//       <div>
//       <img src="/Group 85290 (2).png" alt="" className="object-cover p-5" />
//       </div>
//       <div>
//       <img src="/Group 85291.png" alt=""  className="object-cover p-5"/>
//       </div>
//       <div>
//       <img src="/Group 85294.png" alt="" className="object-cover p-5"/>
//       </div>
//       <div>
//       <img src="/Group 85293.png" alt="" className="object-cover p-5" />
//       </div>
//       {/* <div>
//       <img src="/Group 85278.png" alt="" />
//       </div> */}
//     </Slider>
//   );
// }


import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchHeroImages } from "@/services/HeroSectionUpload";

export default function BannerSlider() {
  const [images, setImages] = useState<{ id: string; src: string; alt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetchHeroImages();
        const bannerImages = response.filter(
          (image: { type: string }) => image.type === "banner"
        );

        const formattedImages = bannerImages.map(
          (image: { id: string; image: string; name: string }) => ({
            id: image?.id,
            src: image?.image,
            alt: image?.name,
          })
        );

        setImages(formattedImages);
      } catch (error) {
        console.error("Failed to fetch banner images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Corrected from "arrow: false"
  };

  return (
    <div>
      <style global jsx>{`
        .slick-prev,
        .slick-next {
          display: none !important;
        }
      `}</style>

      {isLoading ? (
        <p>Loading banners...</p>
      ) : (
        <Slider {...settings}>
          {images?.map((image) => (
            <div key={image?.id}>
              <img src={image?.src} alt={image?.alt} className="object-cover sm:p-5" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
