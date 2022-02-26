import AdminNavbar from "./AdminNavbar";
import { Container } from "@chakra-ui/react";

const Admin = ({ children }: any) => {
  return (
    <>
      <AdminNavbar />
      <Container maxW="container.xl" p={6}>
        {children}
      </Container>
    </>
  );
};

export default Admin;
