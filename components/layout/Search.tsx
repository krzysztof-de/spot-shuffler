"use client";
import { categories } from "@/utils/categories";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = [
      location && `location=${encodeURIComponent(location)}`,
      distance && `distance=${encodeURIComponent(distance)}`,
      category && `category=${encodeURIComponent(category)}`,
    ]
      .filter(Boolean)
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <div className="row wrapper mt-5">
      <div className="col-10 col-lg-5">
        <form className="rounded" onSubmit={handleSubmit}>
          <h2 className="mb-3">Search Places</h2>
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="location_field"
              placeholder="new york"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              Distance
            </label>
            <select
              className="form-select"
              id="guest_field"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            >
              {[10, 20, 50, 100, 300].map((num) => (
                <option key={num} value={num}>{`${num} km`}</option>
              ))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              Place Type
            </label>
            <select
              className="form-select"
              id="room_type_field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mt-4">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
