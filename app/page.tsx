import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "Home - Places",
};
export const dynamic = "force-dynamic";

const getPlaces = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();

  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  console.log('DATA_API_URL:', process.env.DATA_API_URL);

  try {
    const res = await fetch(`${process.env.API_URL}api/places?${queryString}`, {
      cache: "no-cache",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
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
