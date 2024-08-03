import React from "react";
import { IBooking } from "@/backend/models/booking";
import Link from "next/link";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
  },
  {
    label: "Check In",
    field: "checkIn",
    sort: "asc",
  },
  {
    label: "Check Out",
    field: "checkOut",
    sort: "asc",
  },
  {
    label: "Amount Paid",
    field: "amountPaid",
    sort: "asc",
  },
  {
    label: "Actions",
    field: "actions",
    sort: "asc",
  },
];

const seBookings = (bookings: IBooking[]) =>
  bookings?.map((booking) => ({
    id: booking._id,
    checkin: booking.checkInDate,
    checkout: booking.checkOutDate,
    amountPaid: booking.amountPaid,
    actions: (
      <div className="d-flex justify-content-center">
        <Link
          href={`/bookings/${booking._id}`}
          className="btn btn-primary btn-sm me-2"
        >
          View
        </Link>
        <Link
          href={`/bookings/invoice/${booking._id}`}
          className="btn btn-danger btn-sm"
        >
          Invoice
        </Link>
      </div>
    ),
  }));

const MyBookings = ({ data }: Props) => {
  const bookings = data?.bookings;

  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seBookings(bookings)?.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{new Date(row.checkin).toLocaleDateString()}</td>
              <td>{new Date(row.checkout).toLocaleDateString()}</td>
              <td>{`${row.amountPaid} PLN`}</td>
              <td>{row.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
