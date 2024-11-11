import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { IconCookie } from "@/icons";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <a
        href="#"
        id="open-cmp-btn"
        aria-label="Spravovat souhlas s nastavením osobních údajů"
        className="fixed bottom-4 left-4 bg-red-500 rounded-full border group flex gap-2 items-center"
      >
        <IconCookie
          size={12}
          className="text-white transition-colors group-hover:text-white"
        />
        <span className="group-hover:sm:flex hidden pr-2 text-white">
          Spravovat souhlas s nastavením osobních údajů
        </span>
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.getElementById("open-cmp-btn")?.addEventListener("click", function (event) {
              event.preventDefault();
              event.stopPropagation();
              if (typeof scmp !== 'undefined') {
                scmp.open();
              }
            });
          `,
        }}
      />
      <Footer />
    </>
  );
};

export default layout;
