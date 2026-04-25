/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled strict mode intentionally — prevents GSAP + ScrollTrigger
  // from running animations twice in development mode
  reactStrictMode: false,
}

export default nextConfig
