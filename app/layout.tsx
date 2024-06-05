import "material-icons/iconfont/material-icons.css";
import "./globals.scss";

import { AppBar } from "./components/app-bar/AppBar";
import AuthContextProvider from "./guards/AuthContext";
import CustomerAuthContextProvider from "./guards/CustomerAuthContext";
import type { Metadata } from "next";
import Script from "next/script";
import SnackbarContextProvider from "./components/snackbar/snackbar-context";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StoreProvider from "./StoreProvider";
import { script as gtagScript } from "../public/gtag";

export const metadata: Metadata = {
  title: "The Money Game | Jouw leeromgeving voor financiële educatie",
  description:
    "The Money Game: Jouw ultieme leeromgeving voor financiële educatie. Ervaar interactieve financiële lessen, beheer virtuele financiën, en leer bankvaardigheden in een veilige, leuke omgeving. Perfect voor klaslokalen en thuisonderwijs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                {/* <Footer></Footer> */}
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
