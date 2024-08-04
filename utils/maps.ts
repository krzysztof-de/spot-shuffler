import toast from "react-hot-toast";

interface MapCenterPoint {
  lat: number;
  lng: number;
}

interface Props {
  coords: number[];
}

export const getMapCenterPoint = ({
  coords = [],
}: Props): google.maps.LatLngLiteral | undefined => {
  if (coords.length < 2) {
    return undefined;
  }

  const lat = coords[1];
  const lng = coords[0];

  return { lat, lng };
};

export const revalidateTag = (tag: string) => {
  toast.success(`fake revalidating tag: ${tag}`);
}