"use client";
import { IReview } from "@/backend/models/place";
import {
  useDeleteReviewMutation,
  useLazyGetPlaceReviewsQuery,
} from "@/redux/api/placeApi";
import { revalidateTag } from "@/utils/maps";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SetReviews extends IReview {
  actions: JSX.Element;
}

const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
  },
  {
    label: "Rating",
    field: "rating",
    sort: "asc",
  },
  {
    label: "Comment",
    field: "comment",
    sort: "asc",
  },
  {
    label: "Actions",
    field: "actions",
    sort: "asc",
  },
];

const PlaceReviews = () => {
  const [placeId, setPlaceId] = useState("");

  const router = useRouter();
  const [getPlaceReviews, { data, error }] = useLazyGetPlaceReviewsQuery();
  const reviews = data?.reviews;

  const [deleteReview, { isLoading, isSuccess }] = useDeleteReviewMutation();

  const handleGetPlaceReviews = () => {
    getPlaceReviews(placeId);
  };

  const handleDeleteReview = (id: string) => {
    deleteReview({ id, placeId });
  };

  const setReviews = (): SetReviews[] =>
    reviews?.map((review: IReview) => ({
      id: review?._id,
      rating: review?.rating,
      comment: review?.comment,
      actions: (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline-danger mx-2"
            disabled={isLoading}
            onClick={() => handleDeleteReview(review?._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    }));

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("PlaceDetails");
      router.refresh();
      toast.success("Review deleted");
    }
  }, [error, isSuccess]);

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-6">
          <div className="form-check">
            <label htmlFor="roomId_field">Enter Room ID</label>
            <input
              type="text"
              id="roomId_field"
              className="form-control"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
            />

            <button
              className="btn btn-primary form-btn w-100 py-2 mt-3"
              onClick={handleGetPlaceReviews}
            >
              Fetch Reviews
            </button>
          </div>
        </div>
      </div>

      {reviews?.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.field}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {setReviews()?.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.rating}</td>
                <td>{row.comment}</td>
                <td>{row.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="mt-5 text-center">No Reviews</h5>
      )}
    </div>
  );
};

export default PlaceReviews;
