import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero/engine-workshop-background.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">
              Motory, převodovky,
              <br />
              <span className="text-red-500"> turba a další</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 text-pretty max-w-lg">
              Prémiové autodíly pro profesionály. Motory, turbodmychadla a
              převodovky od ověřených výrobců.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" variant="default" asChild>
                <Link href="/#catalog">Prozkoumat katalog</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/poptavka-dilu">Nezávazná poptávka</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-sm uppercase tracking-wider">
                Prozkoumejte dál
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative">
              <Image
                src="/images/hero/standalone-engine-hero.png"
                alt="High-performance automotive engine"
                className="w-full max-w-lg ml-auto object-contain drop-shadow-2xl"
                width={600}
                height={400}
                priority
              />
              {/* <div className="absolute bottom-8 left-0 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl max-w-xs">
                <h3 className="font-bold text-gray-900 mb-2">
                  Premium Quality
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• OEM & Aftermarket Parts</li>
                  <li>• Warranty Guaranteed</li>
                  <li>• Professional Grade</li>
                  <li>• Fast Shipping</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
