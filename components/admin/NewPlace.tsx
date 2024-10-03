"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { IPlace } from "@/backend/models/place";
import { categories } from "@/utils/categories";
import { useNewPlaceMutation } from "@/redux/api/placeApi";
import toast from "react-hot-toast";
import { CustomError } from "@/interfaces/customError";

const NewPlace = () => {
  const [placeDetails, setPlaceDetails] = useState({
    name: "",
    description: "",
    pageLink: "",
    address: "",
    regularPrice: 0,
    reducedPrice: 0,
    notes: "",
    category: "",
    isFavorite: false,
  });

  const {
    name,
    description,
    address,
    regularPrice,
    reducedPrice,
    notes,
    pageLink,
    category,
    isFavorite,
  } = placeDetails;

  const router = useRouter();

  const [newPlace, { isLoading, error, isSuccess }] = useNewPlaceMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;
      toast.error(customError?.errMessage);
    }

    if (isSuccess) {
      router.push("/admin/places");
      toast.success("Place created");
    }
  }, [error, isSuccess, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const placeData = {
      name,
      description,
      pageLink,
      address,
      category,
      isFavorite,
      price: {
        regular: Number(regularPrice),
        reduced: Number(reducedPrice),
        notes,
      },
    };

    newPlace(placeData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setPlaceDetails({
      ...placeDetails,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const features: { name: string; value: keyof typeof placeDetails }[] = [
    { name: "Favorite", value: "isFavorite" },
  ];

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className="mb-4">New Place</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="price_field" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              name="price"
              value={price}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="description_field" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description_field"
              rows={3}
              name="description"
              value={description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="site_field" className="form-label">
              Site
            </label>
            <input
              type="text"
              id="site_field"
              className="form-control"
              name="pageLink"
              value={pageLink}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="place_type_field" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="place_type_field"
              name="category"
              value={category}
              onChange={handleChange}
            >
              {categories.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <label className="mb-3">Price</label>
          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="regular_price_field" className="form-label">
                Regular
              </label>
              <input
                type="number"
                id="regular_price_field"
                className="form-control"
                name="regularPrice"
                value={regularPrice}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="reduced_price_field" className="form-label">
                Kids
              </label>
              <input
                type="number"
                id="reduced_price_field"
                className="form-control"
                name="reducedPrice"
                value={reducedPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="info_field" className="form-label">
              Additional Info
            </label>
            <input
              type="text"
              id="info_field"
              className="form-control"
              name="notes"
              value={notes}
              onChange={handleChange}
            />
          </div>

          {features?.map((feature, i) => (
            <div className="form-check" key={`check-${i}`}>
              <input
                className="form-check-input"
                type="checkbox"
                id={feature.name}
                name={feature.value}
                onChange={handleChange}
                checked={!!placeDetails[feature.value]}
              />
              <label className="form-check-label" htmlFor={feature.name}>
                {feature.name}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary form-btn w-100 py-2 my-4"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlace;
