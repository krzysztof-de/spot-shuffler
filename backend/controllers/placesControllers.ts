import { NextRequest, NextResponse } from "next/server";
import Place, { IPlace, IReview } from "../models/place";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";
import Booking from "../models/booking";
import { upload_file } from "../utils/cloudinary";

// Get all places => /api/places
export const allPlaces = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 10;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Place, queryStr).search().filter();

  let places: IPlace[] = await apiFilters.query;
  const filterPlacesCount: number = places.length;

  apiFilters.pagination(resPerPage);
  places = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filterPlacesCount,
    resPerPage,
    places,
  });
});

// Create new place => /api/admin/places
export const newPlace = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  body.user = req.user._id;

  const place = await Place.create(body);
  return NextResponse.json({
    success: true,
    place,
  });
});

// Get place details => /api/places/:id
export const getPlaceDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const place = await Place.findById(params.id).populate("reviews.user");

    if (!place) {
      throw new ErrorHandler("Place not found", 404);
    }

    return NextResponse.json({
      succes: true,
      place,
    });
  }
);

// Update place details => /api/admin/places/:id
export const updatePlace = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let place = await Place.findById(params.id);
    const body = await req.json();

    if (!place) {
      throw new ErrorHandler("Place not found", 404);
    }

    place = await Place.findByIdAndUpdate(params.id, body, {
      new: true, //returns updated place
    });

    return NextResponse.json({
      succes: true,
      place,
    });
  }
);

// Upload Place Images => /api/admin/places/:id/upload_images
export const uploadPlaceImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const place = await Place.findById(params.id);
    const body = await req.json();

    if (!place) {
      throw new ErrorHandler("Place not found", 404);
    }

    const uploader = async (image: string) => upload_file(image, "places/places");
    const url = await Promise.all((body.images).map(uploader));

    place?.images?.push(...url);
    await place?.save();

    return NextResponse.json({
      succes: true,
      place,
    });
  }
);

// Delete place => /api/admin/places/:id
export const deletePlace = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const place = await Place.findById(params.id);

    if (!place) {
      throw new ErrorHandler("Place not found", 404);
    }

    // TODO delete images assosiated
    await place.deleteOne();

    return NextResponse.json({
      succes: true,
    });
  }
);

// Create/update place review => /api/reviews
export const createPlaceReview = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const { rating, comment, placeId } = body;

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    const place = await Place.findById(placeId);

    const isReviewed = place?.reviews?.some(
      (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
    );

    if (isReviewed) {
      place?.reviews?.forEach((review: IReview) => {
        if (review.user?.toString() === req?.user?._id?.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      place.reviews.push(review);
      place.numOfReviews = place.reviews.length;
    }

    place.ratings =
      place?.reviews?.reduce(
        (acc: number, item: { rating: number }) => item.rating + acc,
        0
      ) / place?.reviews?.length;

    await place.save();

    return NextResponse.json({
      succes: true,
    });
  }
);

// Can user review place => /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");

  const bookings = await Booking.find({ user: req.user._id, place: placeId });

  const canReview = bookings?.length > 0;
  return NextResponse.json({
    canReview,
  });
});

// Get All places - Admin => /api/admin/places
export const allAdminPlaces = catchAsyncErrors(async (req: NextRequest) => {
  const places = await Place.find();

  return NextResponse.json({
    places,
  });
});
