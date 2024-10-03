/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.NODE_ENV === 'production'
      ? "https://neighborhood-drift.vercel.app/"
      : process.env.NODE_ENV === 'preview'
      ? "https://neighborhood-drift.vercel.app/"
      : "http://localhost:3000/",
    DB_LOCAL_URI: "mongodb://localhost:27017/places",
    NEXTAUTH_URL: process.env.NODE_ENV === 'production'
      ? "https://neighborhood-drift.vercel.app/"
      : process.env.NODE_ENV === 'preview'
      ? "https://neighborhood-drift.vercel.app/"
      : "http://localhost:3000/",
    NEXTAUTH_SECRET: "DOASKPODKAPODALMAMSDAMDASDSADASDQWedqad8",
  },
  images: {
    domains: ["picsum.photos", 'res.cloudinary.com'],
  },
};

export default nextConfig;
