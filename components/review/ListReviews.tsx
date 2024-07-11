import React from "react";
import Image from "next/image";
import Ratings from "../ratings/Ratings";
import { IReview } from "@/backend/models/place";

interface Props {
  reviews: IReview[];
}

const ListReviews = ({ reviews }: Props) => {
  return (
    <div className="reviews col-12 col-lg-9 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          {reviews?.length} {reviews?.length === 1 ? "Review" : "Reviews"}
        </h4>

        <button
          type="button"
          className="btn btn-light form-btn"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Add Review
        </button>
      </div>
      <hr />
      {reviews?.map((review: IReview) => {
        const avatar = review?.user?.avatar;

        return (
          <div className="review-card my-3">
            <div className="row">
              <div className="col-3 col-lg-1">
                <Image
                  src={avatar ? avatar.url : "/images/avatar.png"}
                  alt={review?.user?.name}
                  className="rounded-circle placeholder-glow"
                  height={60}
                  width={60}
                />
              </div>
              <div className="col-9 col-lg-11">
                <Ratings rating={review?.rating} />
                <p className="review_user mt-1">by {review?.user?.name}</p>
                <p className="review_comment small">{review?.comment}</p>
              </div>
              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListReviews;
