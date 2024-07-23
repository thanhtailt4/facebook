import axios from "axios";

export const sendMessage = async (reseverId, message, image, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/sendMessage`,
      {
        reseverId,
        message,
        image,
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

export const getMessages = async (reseverId, token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getMessages/${reseverId}`,

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


export const sendMessageRoom = async (roommessId, message, image, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/sendMessageRoom`,
      {
        roommessId,
        message,
        image,
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

export const getMessagesRoom = async (roommessId, token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getMessagesRoom/${roommessId}`,

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
