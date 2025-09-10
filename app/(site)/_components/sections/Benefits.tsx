import { Button } from "@/components/ui/button";
import { CheckCircle, Database, MapPin, Users } from "lucide-react";
import Link from "next/link";

const Benefits = () => {
  const benefits = [
    {
      icon: <Users className="w-16 h-16 text-red-500" />,
      title: "Ověření prodejci",
      description:
        "Všichni naši partneři jsou prověření a certifikovaní prodejci autodílů",
    },
    {
      icon: <Database className="w-16 h-16 text-red-500" />,
      title: "Největší databáze prodejců použítých autodílů",
      description: "Přístup k nejširší síti prodejců v České republice a okolí",
    },
    {
      icon: <CheckCircle className="w-16 h-16 text-red-500" />,
      title: "Jednou poptávkou poptám všechny",
      description:
        "Ušetřete čas - jedna poptávka se dostane ke všem relevantním prodejcům",
    },
    {
      icon: <MapPin className="w-16 h-16 text-red-500" />,
      title: "Lokalizace nejbližších prodejců",
      description:
        "Najděte nejbližší prodejce ve vaší oblasti pro rychlé vyzvednutí",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/frontend/benefitsBg.png')] bg-cover bg-center opacity-5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-red-500 text-lg font-semibold mb-2 tracking-wide uppercase">
            Proč?
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Aplikace hledám díly?
          </h3>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-red-200"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-50 rounded-2xl group-hover:bg-red-100 transition-colors duration-300 group-hover:scale-110 transform">
                  {benefit.icon}
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 text-center mb-4 leading-tight">
                {benefit.title}
              </h4>

              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {benefit.description}
              </p>

              <div className="mt-6 flex justify-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-6">
            Připojte se k tisícům spokojených zákazníků
          </p>
          <Button asChild variant="default">
            <Link href="/#catalog">Začít hledat díly</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
