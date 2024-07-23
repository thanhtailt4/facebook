import axios from "axios";

export const creatRoomMess = async (room_name, groupRef, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/creatRoomMess`,
      {
        room_name,
        groupRef,
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

