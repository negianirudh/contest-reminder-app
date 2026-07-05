import axiosInstance from "./axiosInstance";

export const getContests = async () => {
  const response = await axiosInstance.get("/contests");
  return response.data;
};
