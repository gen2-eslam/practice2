import axios from "axios";
//https://api.github.com/users/1
const instance = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000,
});

export const getUser = async (userId: number) => {
  try {
    const response = await instance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

