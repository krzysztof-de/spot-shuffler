"use client";

import { IPlace } from "@/backend/models/place";
import { CustomError } from "@/interfaces/customError";
import { useDeletePlaceMutation } from "@/redux/api/placeApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface InputProps {
  data: {
    places: IPlace[];
  };
}

const AllPlaces = ({ data }: InputProps) => {
  const [deletePlace, { error, isLoading, isSuccess }] =
    useDeletePlaceMutation();
  const router = useRouter();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;

    }

    if (isSuccess) {
      router.refresh();
      toast.success("Place deleted");
    }
  }, [error, isSuccess, router]);

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

  const deletePlaceHandler = (id: string) => {
    deletePlace(id as unknown as string);
  };

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
          <button
            className="btn btn-outline-danger ms-2 btn-sm"
            onClick={() => deletePlaceHandler(place._id as string)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div>
      <h1 className="my-5 position-relative">
        {`${places?.length} Places`}
        <Link
          href="/admin/places/new"
          className="mt-0 btn btn-primary text-white position-absolute end-0 form-btn"
        >
          Create Place
        </Link>
      </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mapPlaces(places).map((row) => (
            <tr key={`place-${row.id}`}>
              <td>{row.id as string}</td>
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
