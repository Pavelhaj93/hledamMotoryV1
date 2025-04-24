import Button from "@/components/Button";
import MotorsContainer from "../../(motory)/components/MotorsContainer";
import { SafeMotor } from "../../(motory)/components/MotorsList";
import { fetchMotors } from "../../(motory)/utils/fetchMotors";

export const dynamic = "force-dynamic"; // 👈 force dynamic behavior

async function OldSection() {
  const data = await fetchMotors({ motorsVariant: "stare-motory" });
  return (
    <section className="flex flex-col justify-center items-center">
      <MotorsContainer
        params={{ motorsVariant: "stare-motory" }}
        data={data?.slice(0, 4) as SafeMotor[]}
      />
      <a href="/motory/stare-motory">
        <Button arrow color="primary">
          Další motory
        </Button>
      </a>
    </section>
  );
}

export default OldSection;
