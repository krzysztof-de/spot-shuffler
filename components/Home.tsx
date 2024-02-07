import React from "react";
import PlaceItem from "./place/PlaceItem";
import { IPlace } from "@/backend/models/place";

interface Props {
  data: {
    success: true;
    filterPlacesCount: number;
    resPerPage: number;
    places: IPlace[];
  };
}

const Home = ({ data }: Props) => {
  const { filterPlacesCount, resPerPage, places } = data;
  return (
    <div>
      <section id="places" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Places</h2>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          {places?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">Nothing here</div>
          ) : (
            places?.map(place => <PlaceItem key={place._id} place={place}/>)
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
