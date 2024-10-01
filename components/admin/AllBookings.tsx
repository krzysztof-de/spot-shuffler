'use client';
import React, { useEffect } from "react";
import { IBooking } from "@/backend/models/booking";
import Link from "next/link";
import { useDeleteBookingMutation } from "@/redux/api/bookingApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CustomError } from "@/interfaces/customError";

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
    label: "Actions",
    field: "actions",
    sort: "asc",
  },
];

const AllBookings = ({ data }: Props) => {
  const bookings = data?.bookings;
  const router = useRouter();

  const [deleteBooking, { error, isLoading, isSuccess }] =
    useDeleteBookingMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;
      toast.error(customError?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("Booking deleted");
    }
  }, [error, isSuccess, router]);

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
  };

  const setBookings = (bookings: IBooking[]) =>
    bookings?.map((booking) => ({
      id: booking._id as string,
      checkin: booking.checkInDate,
      checkout: booking.checkOutDate,
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
          <button
            className="btn btn-outline-danger mx-2"
            disabled={isLoading}
            onClick={() => handleDeleteBooking(booking?._id as string)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div className="container mt-5">
      <h2>{bookings?.length} Bookings</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {setBookings(bookings)?.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{new Date(row.checkin).toLocaleDateString()}</td>
              <td>{new Date(row.checkout).toLocaleDateString()}</td>
              <td>{row.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
