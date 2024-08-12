import dbConnect from "@/backend/config/dbConnect";
import {
  deletePlaceReview,
  getPlaceReviews,
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

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getPlaceReviews);
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deletePlaceReview);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
