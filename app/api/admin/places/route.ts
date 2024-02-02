import dbConnect from "@/backend/config/dbConnect";
import { newPlace } from "@/backend/controllers/placesControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(newPlace);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
