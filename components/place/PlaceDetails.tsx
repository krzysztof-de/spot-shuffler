"use client";
import { IPlace } from "@/backend/models/place";
import React from "react";
import PlaceImageSlider from "./PlaceImageSlider";
import PlaceFeatures from "./PlaceFeatures";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";
import Ratings from "../ratings/Ratings";
import PlacesDatePicker from "./PlacesDatePicker";
import {
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { getMapCenterPoint } from "@/utils/maps";

interface Props {
  data: {
    place: IPlace;
  };
}

const PlaceDetails = ({ data }: Props) => {
  const { place } = data;
  const coords = place?.location?.coordinates;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{place?.name}</h2>
      <p className="mb-4">
        {place?.location?.formattedAddress || place?.address}
      </p>

      <div className="row">
        <div className="col-12 col-lg-6">
          <PlaceImageSlider images={place?.images} />
        </div>

        <div className="col-12 col-lg-6">
          <div className="ratings mt-auto mb-3">
            <Ratings rating={place?.rating} starDimension={22} />
            <span className="no-of-reviews">
              ({place?.numOfReviews} Reviews)
            </span>
          </div>

          <PlaceFeatures place={place} />
          <PlacesDatePicker place={place} />
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12">
          <h4>Description</h4>
          <p>{place?.description}</p>
        </div>

        <div className="col-12">
          {coords && (
            <div className="my-5" style={{ height: "400px", width: "100%" }}>
              <h3 className="mb-4">Location:</h3>
              <Map
                defaultCenter={getMapCenterPoint({ coords })}
                mapId="PLACES_MAP_ID"
                defaultZoom={12}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              />
              <AdvancedMarker position={getMapCenterPoint({ coords })}>
                <Pin
                  background={"#0f9d58"}
                  borderColor={"#0f9d58"}
                  glyphColor={"#60d98f"}
                />
              </AdvancedMarker>
            </div>
          )}
        </div>
      </div>

      <NewReview />
      <ListReviews />
    </div>
  );
};

export default PlaceDetails;
