import React from 'react';
import StarRatings from 'react-star-ratings';

interface Props {
  ratings: {
    stars: number;
    percentage: number;
  }[];
  maxRating?: number;
  totalReviews: number;
}
const ReviewComponent: React.FC<Props> = ({
  ratings,
  totalReviews,
  // maxRating = 5,
}) => {
  // const totalPercentage = ratings.reduce(
  //   (sum, rating) => sum + rating.percentage,
  //   0
  // );
  // const averagePercentage = (totalPercentage / ratings.length).toFixed(0);

  // Calculate total stars based on the percentage and reviews
  // const totalStars = ratings.reduce(
  //   (sum, rating) =>
  //     sum + rating.stars * (rating.percentage / 100) * totalReviews,
  //   0
  // );
  // const averageReview = (totalStars / totalReviews).toFixed(1);

  return (
    <div className="w-full flex flex-col xxs:flex-row gap-x-2 gap-y-5 xxs:gap-y-0">
      <div className="w-full flex flex-col gap-y-2">
        {ratings.map((rating) => {
          return (
            <div
              key={rating.stars}
              className="w-full flex items-center space-x-4"
            >
              <div className="min-w-[120px]">
                <StarRatings
                  rating={rating.stars}
                  starRatedColor="#FFAD33"
                  // totalStars={maxRating}
                  starDimension="17px"
                  starSpacing="0.5px"
                  // isSelectable={false}
                />
              </div>

              {/* Bar */}
              <div className="relative min-w-[150px] h-[20px] bg-gray-200 rounded-sm overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#FFAD33]"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-col ">
        <div className="flex  items-center">
          <p className="text-xs sm:text-sm md:text-lg xl:text-xl text-gray-600 font-bold">
            {273}
          </p>
          <StarRatings
            rating={parseFloat('4.9')}
            starRatedColor="#FFAD33"
            // totalStars={1} // Show only 1 star
            starDimension="18px"
            starSpacing="1px"
            // isSelectable={false}
          />
        </div>
        <p className="text-xs text-[#00000061]">{totalReviews} reviews</p>

        <div className="mt-10 flex flex-col justify-end">
          <p className="text-xs sm:text-sm md:text-lg xl:text-xl text-gray-600 font-bold">
            {95}%
          </p>
          <h2 className="text-[10px] md:text-xs text-[#00000061] font-semibold">
            Recommendation
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
