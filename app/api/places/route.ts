import dbConnect from "@/backend/config/dbConnect";
import { allPlaces } from "@/backend/controllers/placesControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(allPlaces);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
