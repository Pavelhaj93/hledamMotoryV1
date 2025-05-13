import { Button } from "@/components/ui/button";
import MotorsContainer from "../../(motory)/components/MotorsContainer";
import type { SafeMotor } from "../../(motory)/components/MotorsList";
import { fetchMotors } from "../../(motory)/utils/fetchMotors";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 👈 force dynamic behavior

async function RepasSection() {
  const data = await fetchMotors({ motorsVariant: "repasovane-motory" });
  return (
    <section className="flex flex-col justify-center items-center mt-16">
      <MotorsContainer
        params={{ motorsVariant: "repasovane-motory" }}
        data={data?.slice(0, 4) as SafeMotor[]}
      />
      <Button asChild>
        <Link href="/motory/repasovane-motory">
          Další motory
          <ChevronRight className="ml-2 w-10 h-10" />
        </Link>
      </Button>
    </section>
  );
}

export default RepasSection;
