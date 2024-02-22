"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

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
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filterPlacesCount}
            onChange={handlePageChange}
            pageRangeDisplayed={5}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default CustomPagination;
