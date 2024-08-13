import dbConnect from "@/backend/config/dbConnect";
import {
  allAdminPlaces,
  newPlace,
} from "@/backend/controllers/placesControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminPlaces);
router.use(isAuthenticatedUser, authorizeRoles("admin")).post(newPlace);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
