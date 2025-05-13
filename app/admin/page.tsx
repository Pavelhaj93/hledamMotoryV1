import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Container from "@/components/container/Container";
import TabbedDataGridPage from "./components/TabbedDataGridPage";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <TabbedDataGridPage />
    </Container>
  );
}
