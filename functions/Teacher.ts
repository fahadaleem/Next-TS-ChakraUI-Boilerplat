import { backendUrl } from "./../backendUrl";
import axios from "axios";

export const getAllTeachers = async () => {
  try {
    const students = await axios({
      method: "GET",
      url: `${backendUrl}/teacher/all`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return students.data;
  } catch (error: any) {
    alert(error.message);
  }
};

export const getTeacher = async (teacherEmail: string) => {
  try {
    const teacher = await axios({
      method: "GET",
      url: `${backendUrl}/teacher/${teacherEmail}`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return teacher.data;
  } catch (error: any) {
    alert(error.message);
  }
};

export const deleteTeacher = async (teacherEmail: string) => {
  try {
    const students = await axios({
      method: "DELETE",
      url: `${backendUrl}/teacher/${teacherEmail}`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return students.data;
  } catch (error: any) {
    alert(error.message);
  }
};

export const hireTeacher = async (teacherEmail: string) => {
  try {
    const teacher = await axios({
      method: "PUT",
      url: `${backendUrl}/teacher/${teacherEmail}`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
      data: {
        isHired: true,
      },
    });

    return teacher.status;
  } catch (error: any) {
    alert(error.message);
  }
};
