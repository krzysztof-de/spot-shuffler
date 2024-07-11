import React from "react";
import StarRatings from "react-star-ratings";

interface Props {
  rating: number;
  starDimension?: number;
  changeRating?: (rating: number) => void;
}

const Ratings = ({ rating, starDimension, changeRating }: Props) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#e61e4d"
      numberOfStars={6}
      name="rating"
      starDimension={`${starDimension ?? 18}px`}
      starSpacing="2px"
      changeRating={changeRating}
    />
  );
};

export default Ratings;
