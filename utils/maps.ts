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
    console.error(
      "getMapCenterPoint: coords array must have at least two elements"
    );
    return undefined;
  }
  const lat = coords[1];
  const lng = coords[0];

  return { lat, lng };
};
