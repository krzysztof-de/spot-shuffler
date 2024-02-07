"use client";

import React from "react";
import StarRatings from 'react-star-ratings';

const PlaceItem = () => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card p-2 w-100">
        <img
          className="card-img-top mx-auto"
          src="images/default_place_image.png"
          alt=""
          height="170"
          width="100"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="/places/placeId">Fun Place Name</a>
          </h5>
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>$100</b> / night
            </p>
          </div>
          <div>
            <div>
              <StarRatings
                rating={5}
                starRatedColor="blue"
                numberOfStars={6}
                name="rating"
                starDimension="18px"
                starSpacing="2px"
              />
              <span className="no-of-reviews">(50 Reviews)</span>
            </div>
            <a className="btn view-btn mt-3 w-100" href="/places/placeId">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceItem;
