import axios from "axios";
export const sendRequest = async (groupId, senderId, receiverId, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//sendRequest`,
      {
        groupId,
        senderId,
        receiverId,
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

export const updateGroupCover = async (url, idgroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//updateGroupCover/${idgroup}`,
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

export const deleteInvite = async (requestId, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//deleteInvite`,
      { requestId },
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

export const acceptInvite = async (idgroup, requestId, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//acceptInvite/${idgroup}`,
      { requestId },
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

export const joingroup = async (idgroup, token) => {
  try {
    const { data } = await axios.get(
      `http://34.124.241.174:81//joingroup/${idgroup}`,
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

export const leavegroup = async (idgroup, token) => {
  try {
    const { data } = await axios.get(
      `http://34.124.241.174:81//leavegroup/${idgroup}`,
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

export const followgroup = async (idgroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//followgroup/${idgroup}`,
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
export const unfollowgroup = async (idgroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//unfollowgroup/${idgroup}`,
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

export const settingsgroup = async (
  description,
  privacy,
  hideGroup,
  approveMembers,
  approvePosts,
  idGroup,
  token
) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//settingsgroup`,
      {
        description,
        privacy,
        hideGroup,
        approveMembers,
        approvePosts,
        idGroup,
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

export const approveMember = async (idGroup, idUser, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//approveMember`,
      {
        idGroup,
        idUser,
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

export const declineMember = async (idGroup, idUser, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//declineMember`,
      {
        idGroup,
        idUser,
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

export const cancelRequestGroup = async (idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//cancelRequestGroup`,
      {
        idGroup,
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

export const pendingposts = async (idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//pendingposts`,
      {
        idGroup,
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

export const approvependingposts = async (idPost, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//approvependingposts`,
      {
        idPost,
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

export const refusependingposts = async (idPost, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//refusependingposts`,
      {
        idPost,
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

export const removememberingroup = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//removememberingroup`,
      {
        idMember,
        idGroup,
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

export const removeasadmin = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//removeasadmin`,
      {
        idMember,
        idGroup,
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

export const inviteasadmin = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//inviteasadmin`,
      {
        idMember,
        idGroup,
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

export const cancelinviteasadmin = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//cancelinviteasadmin`,
      {
        idMember,
        idGroup,
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

export const acceptinviteasadmin = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//acceptinviteasadmin`,
      {
        idMember,
        idGroup,
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

export const getusersendinviteasadmin = async (idMember, idGroup, token) => {
  try {
    const { data } = await axios.put(
      `http://34.124.241.174:81//getusersendinviteasadmin`,
      {
        idMember,
        idGroup,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {data};
  } catch (error) {
    return error.response.data.message;
  }
};
