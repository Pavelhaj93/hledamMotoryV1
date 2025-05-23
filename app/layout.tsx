import { Analytics } from "@vercel/analytics/react";
import { Raleway } from "next/font/google";
import Script from "next/script";
import AuthContext from "./context/AuthContext";
import { ReactQueryProvider } from "./context/ReactQueryProvider";
import { SnackBarProvider } from "./context/SnackBarProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <Script
          type="text/javascript"
          src="https://c.seznam.cz/js/rc.js"
          strategy="afterInteractive"
        />
        <Script id="seznam-analytics" strategy="afterInteractive">
          {`
          window.sznIVA.IS.updateIdentities({
            eid: null
          });

          var retargetingConf = {
          rtgId: 1558266,
          consent: null
          };

          window.rc.retargetingHit(retargetingConf);
          `}
        </Script>
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
      <body className={cn("w-screen", inter.className)}>
        <main className="h-full w-full mt-28">
          <SnackBarProvider>
            <ReactQueryProvider>
              <AuthContext>{children}</AuthContext>
            </ReactQueryProvider>
          </SnackBarProvider>

          <Analytics />
        </main>
      </body>
    </html>
  );
}
