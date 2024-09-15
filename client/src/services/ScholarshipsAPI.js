import axios from "axios";
import { API_BASE_URL } from "../constants";

export const getAllScholarships = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/scholarships/getAllScholarships`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
};
