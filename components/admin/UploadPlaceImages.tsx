"use client";
import { IImage, IPlace } from "@/backend/models/place";
import { useUploadPlaceImagesMutation } from "@/redux/api/placeApi";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import Image from "next/image";
import { revalidateTag } from "@/utils/maps";

interface Props {
  data: {
    place: IPlace;
  };
}
const UploadPlaceImages = ({ data }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);

  useEffect(() => {
    if (data) {
      setUploadedImages(data?.place?.images);
    }
  }, [data]);

  const router = useRouter();

  const [uploadPlaceImages, { error, isLoading, isSuccess }] =
    useUploadPlaceImagesMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("PlaceDetails");
      setImagesPreview([]);
      router.refresh();
      toast.success("Images uploaded successfully");
      router.push(`/admin/places/${data.place.id}`);
    }
  }, [error, isSuccess]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result as string]);
          setImagesPreview((prev) => [...prev, reader.result as string]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    uploadPlaceImages({ id: data.place._id, body: { images } });
  };

  const removeImagePreview = (imgUrl: string) => {
    const filteredImages = images.filter((img) => img !== imgUrl);
    setImages(filteredImages);
    setImagesPreview(filteredImages);
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-7 mt-5 mt-lg-0">
        <form className="shadow rounded bg-body">
          <h2 className="mb-4">Upload Room Images</h2>

          <div className="form-group">
            <label htmlFor="customFile" className="form-label">
              Choose Images
            </label>

            <div className="custom-file">
              <input
                ref={fileInputRef}
                type="file"
                name="product_images"
                className="form-control"
                id="customFile"
                onChange={handleChange}
                onClick={handleResetFileInput}
                multiple
                required
              />
            </div>

            {imagesPreview?.length > 0 && (
              <div className="new-images mt-4">
                <p className="text-warning">New Images:</p>
                <div className="row mt-4">
                  {imagesPreview?.map((img, i) => (
                    <div className="col-md-3 mt-2" key={`ip-${i}`}>
                      <div className="card">
                        <img
                          src={img}
                          alt="Img Preview"
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "80px" }}
                        />
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          type="button"
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          onClick={() => removeImagePreview(img)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedImages?.length > 0 && (
              <div className="uploaded-images mt-4">
                <p className="text-success">Room Uploaded Images:</p>
                <div className="row mt-1">
                  {uploadedImages?.map((img, i) => (
                    <div className="col-md-3 mt-2" key={`i-${i}`}>
                      <div className="card">
                        <img
                          src={img?.url}
                          alt={img?.url}
                          className="card-img-top p-2"
                          style={{ width: "100%", height: "80px" }}
                        />
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                          }}
                          className="btn btn-block btn-danger cross-button mt-1 py-0"
                          // onClick={() => handleImageDelete(img.public_id)}
                          // disabled={isDeleteLoading || isLoading}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-primary mt-2 form-btn w-100 py-2"
            onClick={handleSubmit}
            // disabled={isLoading || isDeleteLoading}
          >
            {isLoading ? <ButtonLoader /> : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPlaceImages;
