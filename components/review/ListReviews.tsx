import React from "react";

const ListReviews = () => {
  return (
    <div className="reviews col-12 col-lg-9 mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>3 Reviews</h3>
        <button
          type="button"
          className="btn form-btn"
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
            <img
              src="./images/avatar.jpg"
              alt="John Doe"
              width="60"
              height="60"
              className="rounded-circle"
            />
          </div>
          <div className="col-9 col-lg-11">
            <div className="star-ratings">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half"></i>
            </div>
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
