import React from "react";
import Image from "next/image";
import Ratings from "../ratings/Ratings";

const ListReviews = () => {
  return (
    <div className="reviews col-12 col-lg-9 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4>3 Reviews</h4>
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
      <div className="review-card my-3">
        <div className="row">
          <div className="col-3 col-lg-1">
            <Image
              src="/images/avatar.png"
              alt="John Doe"
              className="rounded-circle placeholder-glow"
              height={60}
              width={60}
            />
          </div>
          <div className="col-9 col-lg-11">
            <Ratings rating={3} />
            <p className="review_user mt-1">by John Doe</p>
            <p className="review_comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              consectetur, mi nec tristique vehicula, elit tellus vulputate ex,
              nec bibendum libero elit at orci.
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ListReviews;
