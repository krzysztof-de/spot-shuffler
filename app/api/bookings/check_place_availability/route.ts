import dbConnect from "@/backend/config/dbConnect";
import { checkPlaceBookingAvailability } from "@/backend/controllers/bookingControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(checkPlaceBookingAvailability);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
