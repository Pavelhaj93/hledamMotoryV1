import Button from "@/components/Button";
import MotorsContainer from "../../(motory)/components/MotorsContainer";
import { SafeMotor } from "../../(motory)/components/MotorsList";
import { fetchMotors } from "../../(motory)/utils/fetchMotors";

export const dynamic = "force-dynamic"; // 👈 force dynamic behavior

async function RepasSection() {
  const data = await fetchMotors({ motorsVariant: "repasovane-motory" });
  return (
    <section className="flex flex-col justify-center items-center">
      <MotorsContainer
        params={{ motorsVariant: "repasovane-motory" }}
        data={data?.slice(0, 4) as SafeMotor[]}
      />
      <a href="/motory/repasovane-motory">
        <Button arrow color="primary">
          Další motory
        </Button>
      </a>
    </section>
  );
}

export default RepasSection;
