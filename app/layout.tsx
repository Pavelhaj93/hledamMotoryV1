import clsx from "clsx";
import AuthContext from "./context/AuthContext";

import "./globals.css";
import { Raleway } from "next/font/google";
import { ReactQueryProvider } from "./context/ReactQueryProvider";
import { SnackBarProvider } from "./context/SnackBarProvider";
import { MaterialThemeProvider } from "./context/MaterialThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(`w-screen`, inter.className)}>
        {/* <main className="border-box h-full w-full"> */}
        <MaterialThemeProvider>
          <SnackBarProvider>
            <ReactQueryProvider>
              <AuthContext>{children}</AuthContext>
            </ReactQueryProvider>
          </SnackBarProvider>
        </MaterialThemeProvider>
        <Analytics />
        {/* </main> */}
      </body>
    </html>
  );
}
