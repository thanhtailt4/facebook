import axios from "axios";

export const uplaodImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `http://backend-service:8000/uploadImages`,
      formData,
      {
        headers: {
          Auhorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
