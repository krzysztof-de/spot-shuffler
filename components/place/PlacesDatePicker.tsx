"use client";
import { calculateDaysOfStay } from "@/backend/helpers/helpers";
import { IPlace } from "@/backend/models/place";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  place: IPlace;
}

const PlacesDatePicker = ({ place }: Props) => {
  const [checkInDate, setCheckInDate] = React.useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState<Date | null>(
    new Date()
  );
  const [daysOfStay, setDaysOfStay] = React.useState<Number>(0);

  const [newBooking] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();
  const isAvailable = data?.isAvailable;
  const { data: { bookedDates } = {} } = useGetBookedDatesQuery(place._id);

  const excludeDates = bookedDates?.map((date: string) => new Date(date)) || [];

  const handleOnChange = (dates: [Date | null, Date | null] | null) => {
    const [checkInDate, checkOutDate] = dates || [null, null];

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);
      setDaysOfStay(days);
    }

    // check booking availability
    checkBookingAvailability({
      id: place._id,
      checkInDate: checkInDate?.toISOString(),
      checkOutDate: checkOutDate?.toISOString(),
    });
  };

  const handleBookPlace = async () => {
    const bookingData = {
      place: place._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: +place?.price?.adults * +daysOfStay,
      paymentInfo: {
        id: "STRIPE_ID",
        status: "PAID",
      },
    };
    const booking = await newBooking(bookingData);
  };

  return (
    <div className="booking-card shadow p-4">
      <p className="place-price">
        <span className="d-block">
          {place?.price?.children && `${place?.price?.children} PLN / children`}
        </span>
        <span className="d-block">
          {place?.price?.adults && `${place?.price?.adults} PLN / adults`}
        </span>
        {place?.price?.notes && (
          <>
            <hr />
            <span className="small">{place?.price?.notes}</span>
          </>
        )}
      </p>
      <DatePicker
        selected={checkInDate}
        onChange={handleOnChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        className="w-100"
        excludeDates={excludeDates}
        selectsRange
      />
      {isAvailable === true && (
        <div className="alert alert-success my-3">
          Place is available. Book now.
        </div>
      )}
      {isAvailable === false && (
        <div className="alert alert-danger my-3">
          Place not available. Try different dates.
        </div>
      )}

      <button
        className="btn btn-primary py-2 w-100 mt-3"
        onClick={handleBookPlace}
      >
        Pay
      </button>
    </div>
  );
};

export default PlacesDatePicker;
