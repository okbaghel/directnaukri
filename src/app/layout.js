import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/app/context/userContext";

export const metadata = {
  title: "DirectNaukri",
  description: "Hire or get hired for delivery, logistics, and field jobs across India with DirectNaukri.",
  keywords: [
    "manpower jobs", "delivery jobs", "DirectNaukri",
    "field staff hiring", "job portal India"
  ],
  openGraph: {
    title: "DirectNaukri – Manpower Jobs Across India",
    description: "India’s trusted platform to find and hire delivery and logistics manpower.",
    siteName: "DirectNaukri",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/directlogo.png", // ✅ Point to your custom logo
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon logo link */}
        <link rel="icon" href="/directlogo.png" type="image/png" sizes="32x32" />

        {/* Razorpay script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="bg-gray-50 text-gray-900">
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
