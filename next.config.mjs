/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
     domains: [
      'images.unsplash.com',
      'raw.githubusercontent.com', // Add this domain for the hoodie images
      // ... any other domains you might use
    ],
     // Add this line if it's not there, or add 'images.unsplash.com' to the array
  },
};

export default nextConfig;
