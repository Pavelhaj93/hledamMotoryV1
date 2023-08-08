import { Metadata } from "next";
import AdminPage from "./containers/AdminPage";

const page = () => {
  //TODO: Add authentication and export authOptions to external file then import it to nextAuth route
  return (
    <>
      <AdminPage />
    </>
  );
};

export default page;
