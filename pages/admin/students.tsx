import Admin from "../../components/Admin";
import StudentComponent from "../../components/Students";
import { useStore } from "../../store";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Students = () => {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return (
    <Admin>
      <StudentComponent />
    </Admin>
  );
};

export default Students;
