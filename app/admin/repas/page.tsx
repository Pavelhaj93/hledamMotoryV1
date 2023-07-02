"use client";

import { useState } from "react";

import MotorsDataGrid from "../components/MotorsDataGrid";

import MotorDialog from "../components/dialogs/MotorDialog";

import Button from "@/components/Button";
import Container from "@/components/container/Container";

const RepasPage = () => {
  const [openMotorModal, setOpenMotorModal] = useState<boolean>(false);

  return (
    <>
      <Container>
        <div className="w-full flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Repasované motory</h1>
          <Button color="primary" onClick={() => setOpenMotorModal(true)}>
            Nový motor
            <span className="bg-[url('/images/frontend/icon-rightArrow.png')]"></span>
          </Button>
        </div>

        <MotorsDataGrid motorsVariant="repas" />
      </Container>

      <MotorDialog
        open={openMotorModal}
        onClose={() => setOpenMotorModal(false)}
        variant="create"
        motorsVariant="repas"
      />
    </>
  );
};

export default RepasPage;
