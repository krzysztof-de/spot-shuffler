import Error from "@/app/error";
import PlaceDetails from "@/components/place/PlaceDetails";

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic";

const getPlace = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}api/places/${id}`, {
    cache: "no-store",
  });
  return res.json();
};

export default async function PlaceDetailsPage({ params }: Props) {
  const data = await getPlace(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <PlaceDetails data={data} />;
}

export async function generateMetadata({ params }: Props) {
  const data = await getPlace(params?.id);

  return { title: data?.place?.name };
}
