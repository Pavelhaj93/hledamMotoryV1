import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Raleway } from "next/font/google";
import Script from "next/script";
import AuthContext from "./context/AuthContext";
import { MaterialThemeProvider } from "./context/MaterialThemeProvider";
import { ReactQueryProvider } from "./context/ReactQueryProvider";
import { SnackBarProvider } from "./context/SnackBarProvider";
import "./globals.css";

const inter = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="//ssp.seznam.cz/static/js/ssp.js" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ND4D88XRC9"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ND4D88XRC9');`}
        </Script>
      </head>
      <body className={clsx(`w-screen`, inter.className)}>
        <main className="h-full w-full">
          <MaterialThemeProvider>
            <SnackBarProvider>
              <ReactQueryProvider>
                <AuthContext>{children}</AuthContext>
              </ReactQueryProvider>
            </SnackBarProvider>
          </MaterialThemeProvider>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
