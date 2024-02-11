"use client";
import { IPlace } from "@/backend/models/place";
import React from "react";
import StarRatings from "react-star-ratings";
import PlaceImageSlider from "./PlaceImageSlider";
import PlaceFeatures from "./PlaceFeatures";
import PlacesDatePicker from "./PlacesDatePicker";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";

interface Props {
  data: {
    place: IPlace;
  };
}

const PlaceDetails = ({ data }: Props) => {
  const { place } = data;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{place?.name}</h2>
      <p className="mb-4">{place?.address}</p>

      <div className="row">
        <div className="col-12 col-lg-6">
          <PlaceImageSlider images={place?.images} />
        </div>

        <div className="col-12 col-lg-6">
          <div className="ratings mt-auto mb-3">
            <StarRatings
              rating={place?.rating}
              starRatedColor="blue"
              numberOfStars={6}
              name="rating"
              starDimension="22px"
              starSpacing="2px"
            />
            <span className="no-of-reviews">
              ({place?.numOfReviews} Reviews)
            </span>
          </div>

          <PlaceFeatures place={place} />
        </div>
      </div>

      <div className="row mt-4 mb-5">
        <div className="col-12">
          <h3>Description</h3>
          <p>{place?.description}</p>
        </div>
      </div>

      <NewReview />
      <ListReviews />
    </div>
  );
};

export default PlaceDetails;
