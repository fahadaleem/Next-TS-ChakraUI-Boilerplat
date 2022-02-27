import Admin from "../../components/Admin";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../store";

const Index = () => {
  const user = useStore((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return <Admin />;
};

export default Index;
