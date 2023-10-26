import Container from "@/components/container/Container";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kontakt | O nás | hledammotory.cz",
  description: "O nás a kontakt",
};

const StyledLi = ({ children }: { children: ReactNode[] }) => (
  <li className="flex gap-2">{children}</li>
);

const StyledSpan = ({ children }: { children: ReactNode }) => (
  <span className="font-bold">{children}</span>
);

export default async function ContactPage() {
  return (
    <>
      <main className="flex flex-col my-5">
        <Container className="flex flex-col items-between gap-10 mb-5">
          <h1 className="text-4xl font-bold text-center mt-2">O nás</h1>
          <span className="leading-7">
            Naše společnost se specializuje generální opravou a repasováním
            motorů do osobních a dodávkových vozidel. Máme více než 10 let
            zkušeností s renovací motorů a díky tomu nabízíme spolehlivé služby.
            Dáváme velký důraz na spokojenost našich zákazníků, kterou
            dosahujeme rychlým vyřízením objednávek a doručením motorů přímo k
            Vám. Renovujeme velké množství značek a modelů, jako jsou koncernové
            vozy Volkswagen, Fiat, Renault, Mercedes, Opel, Ford, Peugeot,
            Citroen a mnoho dalších.
          </span>
          <h2 className="text-xl">Proč si zakoupit repasovaný motor?</h2>
          <ul className="lg:ml-14 flex flex-col gap-2">
            <StyledLi>
              <span>1.</span>
              <span>
                <StyledSpan>Dostupnost a cena:</StyledSpan> Ceny repasovaných
                motorů mohou být různé. Nicméně je důležité si uvědomit, že
                renovace motorů umožňuje získat do vozidla motor s vlastnostmi
                téměř nového, a to až s 50% úsporou nákladů. Velké množství
                motorů máme skladem a díky tomu nabízíme motory výměnou za váš
                původní motor. Díky výměnnému systému je také možné motor získat
                bez čekání, které by bylo spojeno s opravou původního motoru. To
                je obzvláště důležité pro dodávky, které potřebují rychlý návrat
                do provozu. Osobní odběr je možný, ale také zajišťujeme dopravu
                po celé České republice.
              </span>
            </StyledLi>
            <StyledLi>
              <span>2.</span>
              <span>
                <StyledSpan>Kvalita a spolehlivost:</StyledSpan> Repasovaný
                motor je pečlivě kontrolován, renovován a testován našimi
                specialisty. To zajišťuje, že motor je ve vynikajícím stavu a
                bude fungovat spolehlivě.
              </span>
            </StyledLi>
            <StyledLi>
              <span>3. </span>
              <span>
                <StyledSpan>Záruka:</StyledSpan> Na všechny repasované motory
                dáváme záruku po dobu 6 měsců bez omezení najetých kilometrů.
              </span>
            </StyledLi>
            <StyledLi>
              <span>4.</span>
              <span>
                <StyledSpan>Životní prostředí:</StyledSpan> Dalším benefitem je
                vliv na životní prostředí, protože se prodlužuje životnost
                stavajících motorů, tím přispívá k udržitelnosti a snížení
                množství odpadu.
              </span>
            </StyledLi>
          </ul>
          <span>
            Bohužel se některé motory již nevyplatí renovovat. V tomto případě
            Vám můžeme nabídnout širokou škálu starších motorů.
          </span>
        </Container>
      </main>
    </>
  );
}
