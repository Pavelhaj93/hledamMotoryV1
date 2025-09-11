"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataGrid } from "@/components/ui/data-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getColumns } from "./columns/Columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useMessage from "@/app/hooks";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotorDialog from "./dialogs/MotorDialog";
import DeleteMotorDialog from "./dialogs/DeleteMotorDialog";
import type { Motor } from "@prisma/client";
import { ProductsVariant } from "@/types/products";

export default function TabbedDataGridPage() {
  const message = useMessage();

  const [activeTab, setActiveTab] = useState<ProductsVariant>(
    ProductsVariant.Repaired
  );
  const [openUpdateModal, setOpenUpdateModal] = useState<Motor | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<Motor | null>(null);
  const [openMotorModal, setOpenMotorModal] = useState<boolean>(false);

  // Use the activeTab as part of the query key to ensure refetching when tab changes
  const { data, isLoading, isError } = useQuery<Motor[], Error>({
    queryKey: ["motors", activeTab],
    queryFn: async () => {
      const { data } = await axios.get<Motor[]>(`/api/admin/${activeTab}/get`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // if active tab changes, close the dialogs
    if (activeTab) {
      setOpenUpdateModal(null);
      setOpenDeleteModal(null);
      setOpenMotorModal(false);
    }
  }, [activeTab]);

  // Get columns with the action handlers
  const columns = getColumns(setOpenUpdateModal, setOpenDeleteModal);

  // Define tab content configuration
  const tabConfig = {
    [ProductsVariant.Repaired]: {
      title: "Repasované motory",
      description: "Přehled všech dostupných repasovaných motorů.",
      buttonText: "Přidat repasovaný motor",
    },
    [ProductsVariant.Old]: {
      title: "Staré motory",
      description: "Přehled všech dostupných starých motorů.",
      buttonText: "Přidat starý motor",
    },
    [ProductsVariant.EngineHeads]: {
      title: "Motorové hlavy",
      description: "Přehled všech dostupných motorových hlav.",
      buttonText: "Přidat motorovou hlavu",
    },
    [ProductsVariant.Turbochargers]: {
      title: "Turba",
      description: "Přehled všech dostupných turbodmychadel.",
      buttonText: "Přidat turbo",
    },
  };

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Katalog motorů</h1>

        <Tabs
          defaultValue="repas"
          value={activeTab}
          onValueChange={setActiveTab as unknown as (value: string) => void}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6 overflow-x-auto">
            <TabsList className="">
              {Object.keys(tabConfig).map((tabKey) => (
                <TabsTrigger
                  key={tabKey}
                  value={tabKey}
                  className="text-lg font-semibold"
                >
                  {tabConfig[tabKey as keyof typeof tabConfig].title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center">
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setOpenMotorModal(true)}
              >
                <Plus className="mr-2" />
                {tabConfig[activeTab as keyof typeof tabConfig].buttonText}
              </Button>
            </div>
          </div>

          {/* Dynamically render tab content for each tab */}
          {Object.keys(tabConfig).map((tabKey) => (
            <TabsContent
              key={tabKey}
              value={tabKey}
              className="mt-0 bg-gray-100"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {tabConfig[tabKey as keyof typeof tabConfig].title}
                  </CardTitle>
                  <CardDescription>
                    {tabConfig[tabKey as keyof typeof tabConfig].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2 text-lg">Načítám data...</span>
                    </div>
                  ) : isError ? (
                    <div className="text-center text-destructive py-8">
                      Došlo k chybě při načítání dat. Zkus to prosím tě znovu.
                    </div>
                  ) : !data || data.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Žádná data k zobrazení.
                    </div>
                  ) : (
                    <DataGrid columns={columns} data={data} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      {openUpdateModal && (
        <MotorDialog
          open={!!openUpdateModal}
          onClose={() => setOpenUpdateModal(null)}
          motor={openUpdateModal}
          variant="edit"
          productVariant={activeTab}
        />
      )}
      <MotorDialog
        open={openMotorModal}
        onClose={() => setOpenMotorModal(false)}
        variant="create"
        productVariant={activeTab}
      />
      <DeleteMotorDialog
        open={!!openDeleteModal}
        onClose={() => setOpenDeleteModal(null)}
        motor={openDeleteModal}
        productVariant={activeTab}
      />
    </>
  );
}
