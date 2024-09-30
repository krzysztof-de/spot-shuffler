"use client";
import { categories } from "@/utils/categories";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

interface IFilters {
  search: string;
  distance: string;
  category: string;
}

const Search = () => {
  const initialFilters = {
    search: "",
    distance: "",
    category: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const { search, distance, category } = filters;
  const isFiltered = search || distance || category;

  const generateQueryString = useCallback((f: IFilters) => {
    return [
      f?.search && `location=${encodeURIComponent(f?.search)}`,
      f?.distance && `distance=${encodeURIComponent(f?.distance)}`,
      f?.category && `category=${encodeURIComponent(f?.category)}`,
    ]
      .filter(Boolean)
      .join("&");
  }, []);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters({ ...filters, [e.target.name]: e.target.value });
    router.push(`/?${generateQueryString(newFilters)}`);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    router.push("/");
  };

  return (
    <div className="row wrapper mt-1">
      <div className="col-12 col-lg-8">
        <form className="rounded p-0">
          <div className="d-flex w-100 filters-form">
            <div className="form-group mt-3 flex-fill me-3">
              <label htmlFor="search_field" className="mb-1">
                Search
              </label>
              <input
                type="text"
                className="form-control"
                name="search"
                id="search_field"
                placeholder="Enter a phrase"
                value={search}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3 flex-fill me-3">
              <label htmlFor="guest_field" className="mb-1" title="From your home location">
                Distance 
              </label>
              <select
                className="form-select"
                id="guest_field"
                name="distance"
                value={distance}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select distance
                </option>
                {[10, 20, 50, 100, 300].map((num) => (
                  <option key={num} value={num}>{`${num} km`}</option>
                ))}
              </select>
            </div>

            <div className="form-group mt-3 flex-fill">
              <label htmlFor="room_type_field" className="mb-1">
                Category
              </label>
              <select
                className="form-select"
                id="room_type_field"
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {isFiltered && (
              <button
                className="btn btn-light btn-clear"
                onClick={clearFilters}
              >
                <i className="fa-solid fa-times me-2"></i>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
