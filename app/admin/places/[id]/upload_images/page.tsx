import Error from "@/app/error";
import UploadPlaceImages from "@/components/admin/UploadPlaceImages";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "Upload Place Images - ADMIN",
};

export const dynamic = "force-dynamic";

const getPlace = async (id: string) => {
  const { headers } = getAuthHeader();

  const res = await fetch(`${process.env.API_URL}api/places/${id}`, {
    headers,
  });
  return res.json();
};

export default async function AdminUploadImagesPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPlace(params?.id);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <UploadPlaceImages data={data} />;
}
