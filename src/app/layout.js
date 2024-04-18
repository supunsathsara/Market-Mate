
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata = {
  title: "Market Mate",
  description: "Explore, shop, and review a wide range of products with Market Mate – your trusted online marketplace. Elevating your shopping experience, one click at a time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marketmatelk.vercel.app/" />
        <meta property="og:title" content="Market Mate: Shop Smart, Live Better" />
        <meta property="og:description" content="Elevating your shopping experience, one click at a time." />
        <meta property="og:image" content="/marketmate-card.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marketmatelk.vercel.app/" />
        <meta name="twitter:title" content="Market Mate: Shop Smart, Live Better" />
        <meta name="twitter:description" content="Explore a vast selection of products on Market Mate. Elevating your shopping experience, one click at a time." />
        <meta name="twitter:image" content="/marketmate-card.png" />
        <meta name="twitter:creator" content="@ssupunsathsara" />
        </head>
      <body className="min-h-screen h-full text-slate-200">
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
