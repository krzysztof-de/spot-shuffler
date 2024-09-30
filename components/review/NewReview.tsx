import {
  useCanUserReviewQuery,
  usePostReviewMutation,
} from "@/redux/api/placeApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Ratings from "../ratings/Ratings";
import { CustomError } from "@/interfaces/customError";

const NewReview = ({ placeId }: { placeId: string }) => {
  const [rating, setReting] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const { data } = useCanUserReviewQuery(placeId);
  const [postReview, { error, isSuccess }] = usePostReviewMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;
      toast.error(customError?.errMessage);
    }

    if (isSuccess) {
      toast.success("Review posted");
      router.refresh();
    }
  }, [error, isSuccess, router]);

  const handleSubmit = () => {
    const reviewData = {
      rating,
      comment,
      placeId,
    };

    postReview(reviewData);
  };

  return (
    <>
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <!-- Review Modal content goes here --> */}
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Ratings rating={rating} changeRating={(e) => setReting(e)} />
              <div className="form-floating">
                <textarea
                  id="review_field"
                  className="form-control mt-4"
                  placeholder="Leave your review"
                  style={{ height: "100px" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <label htmlFor="review_field">Comment</label>
              </div>
            </div>
            <div className="modal-footer">
              {data?.canReview && (
                <button
                  type="button"
                  className="btn btn-primary my-3 form-btn w-100"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleSubmit}
                >
                  Submit your review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
