import { IPlace } from "@/backend/models/place";
import React from "react";

interface Props {
  place: IPlace;
}

const PlaceFeatures = ({ place }: Props) => {
  return (
    <div className="features mt-4">
      <div className="place-feature">
        <i className="fa-solid fa-icons text-primary"></i>
        <p>{place?.category}</p>
      </div>
      <div className="place-feature">
        <i
          className={
            place?.isFavorite
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"
        ></i>

        <p>Is favorite</p>
      </div>
      <div className="place-feature">
        <a href={place?.pageLink} target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-up-right-from-square text-primary"></i>
          <p>Spot site</p>
        </a>
      </div>
    </div>
  );
};

export default PlaceFeatures;
