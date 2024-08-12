import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking from "../models/booking";
import { IPlace } from "../models/place";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import ErrorHandler from "../utils/errorHandler";
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

// Get current user bookings   =>  /api/bookings/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id });

  return NextResponse.json({
    bookings,
  });
});

// Get bookings details   =>  /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate("user place");

    if (
      booking.user?._id?.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      throw new ErrorHandler(
        "You are not allowed to view this booking details",
        403
      );
    }

    return NextResponse.json({
      booking,
    });
  }
);

const getLastSixMonthsSales = async () => {
  const last6MonthsSales: any = [];

  // Get Current date
  const currentDate = dayjs();

  async function fetchSalesForMonth(
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ) {
    const result = await Booking.aggregate([
      // Stage 1 => Filter the data
      {
        $match: {
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() },
        },
      },
      // Stage 2: Grouping the data
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amountPaid" },
          numOfBookings: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, numOfBookings } =
      result?.length > 0 ? result[0] : { totalSales: 0, numOfBookings: 0 };

    last6MonthsSales.push({
      monthName: startDate.format("MMMM"),
      totalSales,
      numOfBookings,
    });
  }

  for (let i = 0; i < 6; i++) {
    const startDate = dayjs(currentDate).subtract(i, "months").startOf("month");
    const endDate = dayjs(currentDate).subtract(i, "months").endOf("month");

    await fetchSalesForMonth(startDate, endDate);
  }

  return last6MonthsSales;
};

const getTopPerformingPlaces = async (startDate: Date, endDate: Date) => {
  const topPlaces = await Booking.aggregate([
    // Stage 1: Filter documents within start and end date
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    // Stage 2: Group documents by place
    {
      $group: {
        _id: "$place",
        bookingsCount: { $sum: 1 },
      },
    },

    // Stage 3: Sort documents by bookingsCount in descending order
    {
      $sort: { bookingsCount: -1 },
    },
    // Stage 4: Limit the documents
    {
      $limit: 3,
    },
    // Stage 5: Retrieve additional data from places collection like place name
    {
      $lookup: {
        from: "places",
        localField: "_id",
        foreignField: "_id",
        as: "placeData",
      },
    },
    // Stage 6: Takes placeData and deconstructs into documents
    {
      $unwind: "$placeData",
    },
    // Stage 7: Shape the output document (include or exclude the fields)
    {
      $project: {
        _id: 0,
        placeName: "$placeData.name",
        bookingsCount: 1,
      },
    },
  ]);

  return topPlaces;
};

// Get sales stats   =>  /api/admin/sales_stats
export const getSalesStats = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const numberOfBookings = bookings.length;
  const totalSales = bookings.reduce(
    (acc, booking) => acc + booking.amountPaid,
    0
  );

  const sixMonthSalesData = await getLastSixMonthsSales();
  const topPlaces = await getTopPerformingPlaces(startDate, endDate);

  return NextResponse.json({
    numberOfBookings,
    totalSales,
    sixMonthSalesData,
    topPlaces,
  });
});

// Get admin bookings   =>  /api/admin/bookings
export const allAdminBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find();

  return NextResponse.json({
    bookings,
  });
});

// Delete booking   =>  /api/admin/bookings/:id
export const deleteBooking = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id);

    if (!booking) {
      throw new ErrorHandler("Booking not found with this ID", 404);
    }

    await booking.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
