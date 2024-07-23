import axios from "axios";
export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/updateProfilePicture`,
      {
        url,
      },
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
export const updateCover = async (url, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/updateCover`,
      {
        url,
      },
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
export const addFriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/addFriend/${id}`,
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
export const cancelRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/cancelRequest/${id}`,
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
export const follow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http:/35.194.224.95:81/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const unfollow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/unfollow/${id}`,
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
export const acceptRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/acceptRequest/${id}`,
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
export const unfriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/unfriend/${id}`,
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
export const deleteRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/deleteRequest/${id}`,
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
export const search = async (searchTerm, token) => {
  try {
    const { data } = await axios.post(
      `http://35.194.224.95:81/search/${searchTerm}`,
      {},

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

export const searchFriends = async (searchTerm, dataFriend, token) => {
  try {
    const { data } = await axios.post(
      `http://35.194.224.95:81/searchFriends/${searchTerm}`,
      { dataFriend },
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

export const searchMembers = async (searchTerm, dataMembers, token) => {
  try {
    const { data } = await axios.post(
      `http://35.194.224.95:81/searchMembers/${searchTerm}`,
      { dataMembers },
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

export const searchFriendsByBirthday = async (
  searchTerm,
  dataByBirthday,
  token
) => {
  try {
    const { data } = await axios.post(
      `http://35.194.224.95:81/searchFriendsByBirthday/${searchTerm}`,
      { dataByBirthday },

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

export const addToSearchHistory = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/addToSearchHistory`,
      { searchUser },

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
export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/etSearchHistory`,

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
export const removeFromSearch = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/removeFromSearch`,
      { searchUser },

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
export const getFriendsPageInfos = async (idUser, token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getFriendsPageInfos/${idUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const getFriendsByBirthday = async (idUser, token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getFriendsByBirthday/${idUser}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getUser`,

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

export const getGroupsJoined = async (token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getGroupsJoined`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const getdiscoverGroups = async (token) => {
  try {
    const { data } = await axios.get(
      `http://35.194.224.95:81/getdiscoverGroups`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const getFriendsNotInGroup = async (idgroup, token) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/getFriendsNotInGroup/${idgroup}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

// export const images = async (path, sort, max , token) => {
//   try {
//     const images = await axios.post(
//       `http://35.194.224.95/listImages`,
//       { path, sort, max },
//       {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       }
//     );
//     setPhotos(images.data);
//   } catch (error) {
//     console.log(profileError);
//   }
// };
