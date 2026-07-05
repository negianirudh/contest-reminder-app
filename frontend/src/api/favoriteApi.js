import axiosInstance from "./axiosInstance";

export const getFavorites = async () => {
  const response = await axiosInstance.get("/favorites");
  return response.data;
};

export const addFavorite = async (contestId) => {
  const response = await axiosInstance.post(`/favorites/${contestId}`);
  return response.data;
};

export const removeFavorite = async (contestId) => {
  const response = await axiosInstance.delete(`/favorites/${contestId}`);
  return response.data;
};
