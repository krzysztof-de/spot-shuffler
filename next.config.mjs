/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://neighborhood-drift.vercel.app/",
    DB_LOCAL_URI: "mongodb://localhost:27017/places",

    NEXTAUTH_URL: "https://neighborhood-drift.vercel.app/",
    NEXTAUTH_SECRET: "DOASKPODKAPODALMAMSDAMDASDSADASDQWedqad8",
  },
  images: {
    domains: ["picsum.photos", 'res.cloudinary.com'],
  },
};

export default nextConfig;
