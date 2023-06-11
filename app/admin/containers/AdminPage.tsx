"use client";

import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MotorsDataGrid from "../components/MotorsDataGrid";

import MotorDialog from "../components/dialogs/MotorDialog";
import { Mark } from "@prisma/client";

const AdminPage = () => {
  const [marks, setMarks] = useState<Array<Mark["name"]> | []>([]);
  const [openMotorModal, setOpenMotorModal] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/marks").then((res) => {
      const data = res.data.map((mark: Mark) => mark.name);
      setMarks(data);
    });
  }, []);

  return (
    <>
      <div className="w-full flex justify-end p-5">
        <Button onClick={() => setOpenMotorModal(true)}>Novy motor</Button>
      </div>
      <div className="p-5">
        <MotorsDataGrid marks={marks} />
      </div>

      <MotorDialog
        open={openMotorModal}
        onClose={() => setOpenMotorModal(false)}
        marks={marks}
        variant="create"
      />
    </>
  );
};

export default AdminPage;
