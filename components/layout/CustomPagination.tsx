"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  resPerPage: number;
  filterPlacesCount: number;
}

const CustomPagination = ({ resPerPage, filterPlacesCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage: string) => {
    if (typeof window != "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };

  return (
    <>
      {resPerPage < filterPlacesCount && (
        <div>
          <ul className="pagination">
            <li
              className={`page-item ${page === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange((page - 1).toString())}
            >
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            {Array.from({
              length: Math.ceil(filterPlacesCount / resPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange((index + 1).toString())}
              >
                <a className="page-link" href="#">
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                page === Math.ceil(filterPlacesCount / resPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => handlePageChange((page + 1).toString())}
            >
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CustomPagination;
