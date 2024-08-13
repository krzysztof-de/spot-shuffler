import dbConnect from "@/backend/config/dbConnect";
import {
  uploadPlaceImages,
} from "@/backend/controllers/placesControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(uploadPlaceImages);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
