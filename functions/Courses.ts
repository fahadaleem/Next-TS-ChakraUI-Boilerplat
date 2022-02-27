import { backendUrl } from "./../backendUrl";
import axios from "axios";

interface IBook {
  name: string;
  link: string;
  thumbnail: string;
}
interface ICourse {
  name: string;
  description: string;
  books: IBook[];
}

export const handleAddNewCourse = async (data: ICourse) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${backendUrl}/course/create`,
      data,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return response.status;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      return error?.response?.status;
    }
    alert(error.message);
  }
};

export const handleGetCourse = async (courseName: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${backendUrl}/course/${courseName}`,
      headers: {
        Authorization:
          "Bearer 2aasdddmm1ii#nn$@@fqq6aa5r4i%j5e4e#.$c^o6mey45453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      return error?.response?.status;
    }
    alert(error.message);
  }
};
