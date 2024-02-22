import React from "react";
import StarRatings from "react-star-ratings";

interface Props {
  rating: number;
  starDimension?: number;
}

const Ratings = ({ rating, starDimension }: Props) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#e61e4d"
      numberOfStars={6}
      name="rating"
      starDimension={`${starDimension ?? 18}px`}
      starSpacing="2px"
    />
  );
};

export default Ratings;
