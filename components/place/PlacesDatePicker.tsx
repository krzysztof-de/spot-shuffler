"use client";
import { IPlace } from "@/backend/models/place";
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

  const handleOnChange = (dates: [Date | null, Date | null] | null) => {
    const [checkInDate, checkOutDate] = dates || [null, null];
  
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
  
    if (checkInDate && checkOutDate) {
      console.log(checkInDate, checkOutDate);
      // check availability
    }
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
        selectsRange
      />
    </div>
  );
};

export default PlacesDatePicker;
