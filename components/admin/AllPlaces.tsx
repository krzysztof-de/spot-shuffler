"use client";

import { IPlace } from "@/backend/models/place";
import Link from "next/link";
import React from "react";

interface InputProps {
  data: {
    places: IPlace[];
  };
}

const AllPlaces = ({ data }: InputProps) => {
  const columns = [
    {
      label: "Place ID",
      field: "id",
      sort: "asc",
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
    },
  ];

  const places = data?.places;

  const mapPlaces = (places: IPlace[]) =>
    places?.map((place) => ({
      id: place._id,
      name: place.name,
      actions: (
        <div className="d-flex justify-content-center">
          <Link
            href={`/admin/places/${place._id}`}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <Link
            href={`/admin/places/${place._id}/upload_images`}
            className="btn btn-outline-success ms-2 btn-sm"
          >
            <i className="fa fa-images"></i>
          </Link>
          <button className="btn btn-outline-danger ms-2 btn-sm">
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div>
      <h1 className="my-4">{`${places?.length} Places`}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mapPlaces(places)?.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPlaces;
