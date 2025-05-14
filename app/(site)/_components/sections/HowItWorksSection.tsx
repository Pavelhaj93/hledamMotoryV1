"use client";

import {
  ClipboardCheck,
  Mail,
  Handshake,
  Megaphone,
  Target,
  Package,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProcessStepsAlternative() {
  const steps = [
    {
      id: 1,
      icon: <ClipboardCheck className="h-12 w-12 text-red-600" />,
      title: "Poptáte motor který hledáte",
      description: "Vyplníte jednoduchý formulář s požadavky na motor.",
    },
    {
      id: 2,
      icon: <Megaphone className="h-12 w-12 text-red-600" />,
      title: "Oslovíme za Vás všechny prodejce motorů",
      description:
        "Vaši poptávku rozešleme všem relevantním prodejcům v naší síti.",
    },
    {
      id: 3,
      icon: <Mail className="h-12 w-12 text-red-600" />,
      title: "Zašleme Vám odpovídající nabídky",
      description:
        "Obdržíte přehledný seznam nabídek odpovídajících vašim požadavkům.",
    },
    {
      id: 4,
      icon: <Target className="h-12 w-12 text-red-600" />,
      title: "Vyberete si pro Vás tu nejlepší nabídku",
      description:
        "Porovnáte ceny, dostupnost a další parametry a vyberete nejlepší nabídku.",
    },
    {
      id: 5,
      icon: <Handshake className="h-12 w-12 text-red-600" />,
      title: "Prodejce Vás kontaktuje a domluvíte se na předání",
      description: "Prodejce s vámi dohodne detaily předání a platby.",
    },
    {
      id: 6,
      icon: <Package className="h-12 w-12 text-red-600" />,
      title: "Máte motor u sebe",
      description: "Získáte požadovaný motor a můžete ho začít používat.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Jak získat motor v 6 jednoduchých krocích
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Náš proces je navržen tak, aby byl pro vás co nejjednodušší a
            nejefektivnější. Stačí sledovat těchto 6 kroků a brzy budete mít
            svůj motor.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-100 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div
                  className={`lg:flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-red-600 z-10">
                    <span className="flex items-center justify-center h-full text-white font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"
                    }`}
                  >
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4 lg:hidden">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <div className="hidden lg:block mb-3">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`hidden lg:flex lg:w-1/2 ${
                      index % 2 === 0
                        ? "lg:justify-start lg:pl-16"
                        : "lg:justify-end lg:pr-16"
                    } items-center`}
                  >
                    <div className="bg-white p-4 rounded-full shadow-sm">
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button>
            Poptat motor
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
