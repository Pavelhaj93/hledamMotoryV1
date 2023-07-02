import Container from "@/components/container/Container";

const AdminPage = () => {
  return (
    <Container>
      <div className="w-full h-480 flex flex-row justify-between gap-10 p-10">
        <a
          href="/admin/old"
          className="w-1/2 border-s-violet-100 border-2 h-full align-middle items-center justify-center flex flex-col cursor-pointer"
        >
          <h1 className="text-3xl font-bold">Staré</h1>
        </a>
        <a
          href="/admin/repas"
          className="w-1/2 border-s-violet-100 border-2 h-full align-middle items-center justify-center flex flex-col cursor-pointer"
        >
          <h1 className="text-3xl font-bold">Repas</h1>
        </a>
      </div>
    </Container>
  );
};

export default AdminPage;
