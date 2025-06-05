declare module 'react-star-ratings' {
  import { ComponentType } from 'react';

  interface StarRatingsProps {
    rating: number;
    starRatedColor?: string;
    starEmptyColor?: string;
    starSpacing?: string;
    starDimension?: string;
    changeRating?: (newRating: number) => void;
  }

  const StarRatings: ComponentType<StarRatingsProps>;
  export default StarRatings;
}
