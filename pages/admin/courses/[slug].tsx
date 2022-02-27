import { useRouter } from "next/router";
import Admin from "../../../components/Admin";
import { CourseDetailsComponent } from "../../../components/Courses";
const CourseDetails = () => {
  const router = useRouter();

  const { slug } = router.query;
  return (
    <Admin>
      <CourseDetailsComponent courseName={slug} />
    </Admin>
  );
};

export default CourseDetails;
