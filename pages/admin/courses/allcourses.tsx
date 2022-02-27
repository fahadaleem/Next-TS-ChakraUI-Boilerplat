import Admin from "../../../components/Admin";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../../store";

const AllCourses = () => {
  const user = useStore((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);
  return (
    <Admin>
      <h1>Courses</h1>
    </Admin>
  );
};

export default AllCourses;
