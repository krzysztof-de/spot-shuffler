import { NextRequest, NextResponse } from "next/server";
import Place, { IPlace } from "../models/place";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";

// Get all places => /api/places
export const allPlaces = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const placesCount: number = await Place.countDocuments();
  const apiFilters = new APIFilters(Place, queryStr).search().filter();

  let places: IPlace[] = await apiFilters.query;
  const filterPlacesCount: number = places.length;

  apiFilters.pagination(resPerPage);
  places = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    placesCount,
    filterPlacesCount,
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
      new: true, //returns updated place
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
