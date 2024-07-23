import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `http://35.194.224.95:81/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
