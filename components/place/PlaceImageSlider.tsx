import { IImage } from "@/backend/models/place";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";

interface Props {
  images: IImage[];
}

const PlaceImageSlider = ({ images }: Props) => {
  return (
    <Carousel>
      {images?.length > 0 ? (
        images.map((image) => (
          <Carousel.Item key={image?.public_id}>
            <div style={{ width: "100%", height: "350px" }}>
              <Image
                src={image?.url}
                alt={image?.url}
                layout="fill"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <div style={{ width: "100%", height: "350px" }}>
            <Image
              src={"/images/default_place_image.png"}
              alt={"/images/default_place_image.png"}
              layout="fill"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default PlaceImageSlider;
