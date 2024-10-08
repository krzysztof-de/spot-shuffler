"use client";
import React from "react";
import PlaceItem from "./place/PlaceItem";
import { IPlace } from "@/backend/models/place";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "next/navigation";
import PoiMarkers, { PoiType } from "./poiMarkers/PoiMarkers";
import Search from "./layout/Search";

interface Props {
  data: {
    success: true;
    filterPlacesCount: number;
    resPerPage: number;
    places: IPlace[];
  };
}

const locations: PoiType[] = [
  { key: "currentPlace", location: { lat: 52.237049, lng: 21.017532 } },
];

const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  return (
    <div>
      <section id="places" className="container mt-5">
        <h3 className="mb-3 ml-2 stays-heading">
          {location
            ? `${data?.filterPlacesCount} place${
                data?.filterPlacesCount === 1 ? "" : "s"
              } found with "${location}"`
            : "All places"}
        </h3>
        <Search />
        <div className="row mt-4">
          {data?.places?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100" key="no-places">
              Nothing here
            </div>
          ) : (
            data?.places?.map((place) => (
              <PlaceItem key={`item-${place._id}`} place={place} />
            ))
          )}
        </div>
      </section>

      {/* Multi markers for google map */}
      {/* <PoiMarkers pois={locations} /> */}

      <CustomPagination
        resPerPage={data?.resPerPage}
        filterPlacesCount={data?.filterPlacesCount}
      />
    </div>
  );
};

export default Home;
