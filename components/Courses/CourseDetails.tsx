import { Box } from "@chakra-ui/react";
import { handleGetCourse } from "../../functions/Courses";
import { useEffect, useState } from "react";

export const CourseDetailsComponent = ({ courseName }: any) => {
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    handleGetCourse(courseName).then((resp) => setCourseDetails(resp));
  }, [courseName]);
  return <Box></Box>;
};
