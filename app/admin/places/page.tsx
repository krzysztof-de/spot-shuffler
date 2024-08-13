import Error from "@/app/error";
import AllPlaces from "@/components/admin/AllPlaces";
import Home from "@/components/Home";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Dashboard - ADIMN",
};

export const dynamic = "force-dynamic";

const getPlaces = async () => {
  const { headers } = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}api/admin/places`, {
    headers,
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

  return <AllPlaces data={data} />;
}
