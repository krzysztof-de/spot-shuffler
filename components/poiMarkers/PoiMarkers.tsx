import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export type PoiType = { key: string; location: google.maps.LatLngLiteral };

const PoiMarkers = (props: { pois: PoiType[] }) => {
  return (
    <>
      {props.pois.map((poi: PoiType) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin
            background={"#FBBC04"}
            glyphColor={"#FBBC04"}
            borderColor={"#d39e00"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
