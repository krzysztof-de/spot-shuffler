import Error from "@/app/error";
import Home from "@/components/Home";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Dashboard - ADIMN",
};

export const dynamic = "force-dynamic";

const getPlaces = async () => {
const authHeaders = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}api/admin/places`, {
    headers: authHeaders.headers,
    cache: 'no-store',
    next: {
      tags: ['Places'],
    }
  });
  return res.json();
};

export default async function AdminPlacesPage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getPlaces();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
