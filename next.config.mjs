/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000/",
    DB_LOCAL_URI: "mongodb://localhost:27017/places",
    DB_URI: "",
  },
  images: {
    domains: ['picsum.photos']
  }
};

export default nextConfig;
