import dbConnect from "@/backend/config/dbConnect";
import { getPlaceDetails } from "@/backend/controllers/placesControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getPlaceDetails);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
