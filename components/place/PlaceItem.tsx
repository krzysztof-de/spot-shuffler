"use client";

import { IPlace } from "@/backend/models/place";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";

interface Props {
  place: IPlace;
}

const PlaceItem = ({ place }: Props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card p-2 w-100">
        <Image
          className="card-img-top mx-auto"
          src={
            place?.images?.length > 0
              ? place.images[0].url
              : "/images/default_place_image.png"
          }
          alt={place?.name}
          height={200}
          width={400}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="/places/placeId">{place?.name }</a>
          </h5>
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>$100</b> / night
            </p>
          </div>
          <div>
            <div>
              <StarRatings
                rating={place?.ratings}
                starRatedColor="blue"
                numberOfStars={6}
                name="rating"
                starDimension="18px"
                starSpacing="2px"
              />
              <span className="no-of-reviews">({place?.numOfReviews} Reviews)</span>
            </div>
            <Link className="btn view-btn mt-3 w-100" href={`/places/${place?._id}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceItem;
