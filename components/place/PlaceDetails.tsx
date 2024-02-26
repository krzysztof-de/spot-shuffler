"use client";
import { IPlace } from "@/backend/models/place";
import React from "react";
import PlaceImageSlider from "./PlaceImageSlider";
import PlaceFeatures from "./PlaceFeatures";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";
import Ratings from "../ratings/Ratings";

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
          <Ratings rating={place?.rating} starDimension={22}/>
            <span className="no-of-reviews">
              ({place?.numOfReviews} Reviews)
            </span>
          </div>

          <PlaceFeatures place={place} />
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12">
          <h4>Description</h4>
          <p>{place?.description}</p>
        </div>
      </div>

      <NewReview />
      <ListReviews />
    </div>
  );
};

export default PlaceDetails;