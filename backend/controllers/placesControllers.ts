import { NextRequest, NextResponse } from "next/server";
import Place from "../models/place";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// Get all places => /api/places
export const allPlaces = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;
  const places = await Place.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    places,
  });
});

// Create new place => /api/admin/places
export const newPlace = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const place = await Place.create(body);

  return NextResponse.json({
    success: true,
    place,
  });
});

// Get place details => /api/places/:id
export const getPlaceDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const place = await Place.findById(params.id);

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
      new: true, //returns updated room
    });

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
