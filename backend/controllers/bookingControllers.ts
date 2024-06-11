import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import { IPlace } from "../models/place";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

// Create new Booking   =>  /api/bookings
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const {
    place,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = body;

  const booking = await Booking.create({
    place,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  return NextResponse.json({
    booking,
  });
});

// Check place Booking Availability   =>  /api/bookings/check
export const checkPlaceBookingAvailability = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get("placeId");

    const checkInDate: Date = new Date(
      searchParams.get("checkInDate") as string
    );
    const checkOutDate: Date = new Date(
      searchParams.get("checkOutDate") as string
    );

    const bookings: IPlace[] = await Booking.find({
      place: placeId,
      $and: [
        { checkInDate: { $lte: checkOutDate } },
        { checkOutDate: { $gte: checkInDate } },
      ],
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
      isAvailable,
    });
  }
);

// Get place boocked dates   =>  /api/bookings/get_booked_dates
export const getPlaceBoockedDates = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get("placeId");

    const bookings = await Booking.find({ place: placeId });
    const bookedDates: string[] = [];

    bookings.flatMap((booking) => {
      const start = dayjs(booking.checkInDate);
      const end = dayjs(booking.checkOutDate);

      for (let day = start; day.isSameOrBefore(end); day = day.add(1, "day")) {
        bookedDates.push(day.format("YYYY-MM-DD"));
      }
    });

    return NextResponse.json({
      bookedDates,
    });
  }
);
