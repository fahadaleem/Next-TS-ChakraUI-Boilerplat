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

  const audio = new Audio(
    "https://firebasestorage.googleapis.com/v0/b/qarijee-teacher1.appspot.com/o/recitations%2F112.mp3?alt=media&token=41b56741-3661-4f26-ab7b-631b490eab94"
  );
  return (
    <Admin>
      <h1>Courses</h1>
      <button
        onClick={() => {
          audio.play();
        }}
      >
        Click
      </button>
      <button
        onClick={() => {
          audio.pause();
        }}
      >
        pause
      </button>
    </Admin>
  );
};

export default AllCourses;
