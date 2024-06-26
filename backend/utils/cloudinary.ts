import cloudinary from "cloudinary";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_file = (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result: any) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  });
};

const delete_file = async (file: string): Promise<boolean> => {
  const res = await cloudinary.v2.uploader.destroy(file);

  return res?.result === "ok";
};

export { upload_file, delete_file, cloudinary };
