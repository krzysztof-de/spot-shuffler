import Error from "@/app/error";
import AllBookings from "@/components/admin/AllBookings";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "All Bookings - ADIMN",
};

export const dynamic = "force-dynamic";

const getBookings = async () => {
  const authHeaders = getAuthHeader();

  const res = await fetch(
    `${process.env.API_URL}api/admin/bookings`,
    authHeaders
  );

  return res.json();
};

export default async function AdminAllBookingsPage() {
  const data = await getBookings();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <AllBookings data={data} />;
}
