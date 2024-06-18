//Generate Stripe checkout session => /api/paymant/checkout_session/:placeId

import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Place from "../models/place";
import User from "../models/user";
import Booking from "../models/booking";
import { headers } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const stripeCheckoutSession = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { searchParams } = new URL(req.url);

    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const daysOfStay = searchParams.get("daysOfStay");
    const placeAmount = searchParams.get("amount");

    // Get place details
    const place = await Place.findById(params.id);

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/bookings/me`,
      cancel_url: `${process.env.API_URL}/place/${place?._id}`,
      customer_email: req.user.email,
      client_reference_id: params?.id,
      metadata: { checkInDate, checkOutDate, daysOfStay },
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pln",
            unit_amount: Number(placeAmount) * 100,
            product_data: {
              name: place?.name,
              description: place?.description,
              images: [`${place?.images[0]?.url}`],
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json(session);
  }
);

// Create new booking after payment  =>  /api/payment/webhook
export const webhookCheckout = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = headers().get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const place = session.client_reference_id;
      const user = (await User.findOne({ email: session?.customer_email })).id;

      const amountPaid = session?.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      await Booking.create({
        place,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      return NextResponse.json({ success: true });
    }
  } catch (error: any) {
    console.log("Eror in stripe checkout webhook => ", error);
    return NextResponse.json({ errMessage: error?.message });
  }
};

