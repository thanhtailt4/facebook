import axios from "axios";
export const createNotification = async (
  receiverId,
  type,
  postId,
  commentId,
  link,
  description,
  token
) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81/createNotification`,
      {
        receiverId,
        type,
        postId,
        commentId,
        link,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const setRead = async (idNotification, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81/setRead/${idNotification}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
