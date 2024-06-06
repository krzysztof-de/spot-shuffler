import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "Home - Places",
};
export const dynamic = "force-dynamic";

const getPlaces = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const res = await fetch(`${process.env.API_URL}api/places?${queryString}`, {
    cache: 'no-store',
  });
  return res.json();
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getPlaces(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
