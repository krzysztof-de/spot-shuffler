import Home from "@/components/Home";
import Error from "./error";

const getPlaces = async () => {
  const res = await fetch(`${process.env.API_URL}api/places`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function HomePage() {
  const data = await getPlaces();

  if (data?.message) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
