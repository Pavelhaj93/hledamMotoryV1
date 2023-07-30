"use client";

import { useState } from "react";

import MotorsDataGrid from "../components/MotorsDataGrid";

import MotorDialog from "../components/dialogs/MotorDialog";

import Button from "@/components/Button";
import Container from "@/components/container/Container";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation;

const OldMotorsPage = () => {
  const [openMotorModal, setOpenMotorModal] = useState<boolean>(false);
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  return (
    <>
      <Container>
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Staré motory</h1>
          <Button color="primary" onClick={() => setOpenMotorModal(true)}>
            Nový motor
            <span className="bg-[url('/images/frontend/icon-rightArrow.png')]"></span>
          </Button>
        </div>
        <MotorsDataGrid motorsVariant="old" />
      </Container>

      <MotorDialog
        open={openMotorModal}
        onClose={() => setOpenMotorModal(false)}
        variant="create"
        motorsVariant="old"
      />
    </>
  );
};

export default OldMotorsPage;
