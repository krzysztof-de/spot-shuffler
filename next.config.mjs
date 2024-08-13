/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000/",
    DB_LOCAL_URI: "mongodb://localhost:27017/places",
    DB_URI: "mongodb://localhost:27017/places",

    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "DOASKPODKAPODALMAMSDAMDASDSADASDQWedqad8",
  },
  images: {
    domains: ["picsum.photos", 'res.cloudinary.com'],
  },
};

export default nextConfig;
