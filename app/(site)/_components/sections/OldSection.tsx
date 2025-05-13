import { Button } from "@/components/ui/button";
import MotorsContainer from "../../(motory)/components/MotorsContainer";
import type { SafeMotor } from "../../(motory)/components/MotorsList";
import { fetchMotors } from "../../(motory)/utils/fetchMotors";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 👈 force dynamic behavior

async function OldSection() {
  const data = await fetchMotors({ motorsVariant: "stare-motory" });
  return (
    <section className="flex flex-col justify-center items-center mb-8">
      <MotorsContainer
        params={{ motorsVariant: "stare-motory" }}
        data={data?.slice(0, 4) as SafeMotor[]}
      />
      {/* <a href="/motory/stare-motory"> */}
      {/* Add Button as a Link with icon next to text inside */}
      <Button asChild>
        <Link href="/motory/stare-motory">
          Další motory
          <ChevronRight className="ml-2 w-10 h-10" />
        </Link>
      </Button>

      {/* </a> */}
    </section>
  );
}

export default OldSection;
