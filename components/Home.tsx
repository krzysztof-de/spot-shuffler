"use client";
import React from "react";
import PlaceItem from "./place/PlaceItem";
import { IPlace } from "@/backend/models/place";
import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    success: true;
    filterPlacesCount: number;
    resPerPage: number;
    places: IPlace[];
  };
}

const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const { filterPlacesCount, resPerPage, places } = data;

  return (
    <div>
      <section id="places" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location
            ? `${filterPlacesCount} place${
                filterPlacesCount === 1 ? "" : "s"
              } found with "${location}"`
            : "All places"}
        </h2>
        <Link href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
        <div className="row mt-4">
          {places?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">Nothing here</div>
          ) : (
            places?.map((place) => <PlaceItem key={place._id} place={place} />)
          )}
        </div>
      </section>
      <CustomPagination
        resPerPage={resPerPage}
        filterPlacesCount={filterPlacesCount}
      />
    </div>
  );
};

export default Home;
