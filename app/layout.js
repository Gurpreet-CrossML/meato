import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/navbar";
import CartDrawer from "@/components/cart-drawer";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

import Chatbot from "@/components/chat/chatbot";

export const metadata = {
  title: "Meato — Premium Butcher & Beef Delivery",
  description:
    "Ethically sourced premium beef cuts prepared by expert butchers. Experience restaurant quality meat at home. Shop Wagyu, dry-aged steaks, BBQ cuts & more.",
  keywords: "premium beef, wagyu, butcher, steak delivery, dry aged, grass fed",
  openGraph: {
    title: "Meato — Premium Butcher & Beef Delivery",
    description: "Restaurant quality meat delivered fresh to your door.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <Chatbot />
            <Toaster
              position="bottom-right"
              richColors
              toastOptions={{
                style: {
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "16px",
                  fontFamily: "var(--font-geist-mono)",
                },
              }}
            />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
