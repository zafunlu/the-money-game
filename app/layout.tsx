import "material-icons/iconfont/material-icons.css";
import "./globals.scss";
import type { Metadata } from "next";
import { AppBar } from "./components/app-bar/AppBar";
import { Footer } from "./components/footer/Footer";
import SnackbarContextProvider from "./components/snackbar/snackbar-context";
import AuthContextProvider from "./guards/AuthContext";
import StoreProvider from "./StoreProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomerAuthContextProvider from "./guards/CustomerAuthContext";
import Script from "next/script";
import { script as gtagScript } from "../public/gtag";

export const metadata: Metadata = {
  title: "Fun Banking | Your Online Banking Simulator",
  description:
    "Fun Banking: Experience the Ultimate Online Banking Simulator for Educators, Teachers and Families. Engage in interactive financial education, manage virtual finances, and learn banking skills in a safe, fun environment. Perfect for classrooms and home learning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2044180719717177"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="pt-[66px]">
        <StoreProvider>
          <SnackbarContextProvider>
            <CustomerAuthContextProvider>
              <AuthContextProvider>
                <div>
                  <AppBar />
                  {children}
                </div>
                <Footer></Footer>
              </AuthContextProvider>
            </CustomerAuthContextProvider>
          </SnackbarContextProvider>
        </StoreProvider>
        <SpeedInsights />
        <Script
          id="gtag_manager"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7SJ7G9JDPD"
        />
        <Script id="gtag" strategy="beforeInteractive">
          {gtagScript}
        </Script>
      </body>
    </html>
  );
}
