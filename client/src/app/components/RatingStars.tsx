// import React from 'react';
// import StarRatings from 'react-star-ratings';

// interface RatingProps {
//   rating: number;
//   maxRating?: number;
//   isEditable?: boolean;
//   onRate?: (rating: number) => void;
//   starDimension?: string;
// }

// const Rating: React.FC<RatingProps> = ({
//   rating,
//   maxRating = 5,
//   isEditable = false,
//   onRate,
//   starDimension = '20px',
// }) => {
//   const handleRatingChange = (newRating: number) => {
//     if (isEditable && onRate) {
//       onRate(newRating);
//     }
//   };

//   const options = {
//     starRatedColor: '#FFAD33',
//     starHoverColor: isEditable ? 'gold' : '#e5e7eb',
//     numberOfStars: maxRating,
//     starEmptyColor: '#e4e5e9',
//     starDimension: starDimension,
//     starSpacing: '1px',
//     rating: rating,
//     isEditable: isEditable,
//   };

//   return <StarRatings changeRating={handleRatingChange} {...options} />;
// };

// export default Rating;

import React from 'react';
import StarRatings from 'react-star-ratings';
import { useMediaQuery } from 'react-responsive';

interface RatingProps {
  rating: number;
  maxRating?: number;
  isEditable?: boolean;
  onRate?: (rating: number) => void;
  starDimension?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  isEditable = false,
  onRate,
  starDimension = '20px',
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 }); // Tailwind 'sm' breakpoint

  const handleRatingChange = (newRating: number) => {
    if (isEditable && onRate) {
      onRate(newRating);
    }
  };

  const options = {
    starRatedColor: '#FFAD33',
    starHoverColor: isEditable ? 'gold' : '#e5e7eb',
    numberOfStars: maxRating,
    starEmptyColor: '#e4e5e9',
    starDimension: isSmallScreen ? '10px' : starDimension,
    starSpacing: '1px',
    rating: rating,
    isEditable: isEditable,
  };

  return <StarRatings changeRating={handleRatingChange} {...options} />;
};

export default Rating;
