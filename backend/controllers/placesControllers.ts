import { NextRequest, NextResponse } from "next/server";
import Place from "../models/place";

export const allPlaces = async (req: NextRequest) => {
  const resPerPage: number = 8;
  const places = await Place.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    places,
  });
};

export const newPlace = async (req: NextRequest) => {
  const body = await req.json();

  const place = await Place.create(body);

  return NextResponse.json({
    success: true,
    place,
  });
};
