import Admin from "../../components/Admin";
import Teacher from "../../components/Teachers";
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
      <Teacher />
    </Admin>
  );
};

export default Students;
