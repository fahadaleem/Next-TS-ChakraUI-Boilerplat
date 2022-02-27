import { backendUrl } from "./../backendUrl";
import axios from "axios";

export const getAllStudents = async () => {
  try {
    const students = await axios({
      method: "GET",
      url: `${backendUrl}/student/all`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return students.data;
  } catch (error: any) {
    alert(error.response?.data.message);
  }
};

export const deleteStudent = async (studentEmail: string) => {
  try {
    const students = await axios({
      method: "DELETE",
      url: `${backendUrl}/student/${studentEmail}`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return students.data;
  } catch (error: any) {
    alert(error.response?.data.message);
  }
};
