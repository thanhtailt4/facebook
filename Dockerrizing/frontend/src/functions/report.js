import axios from "axios";

export const creatReport = async (
  postRef,
  commentRef,
  groupRef,
  to,
  type,
  token
) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/creatReport`,
      {
        postRef,
        commentRef,
        groupRef,
        to,
        type,
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

export const getReportsToGroup = async (idgroup, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getReportsToGroup/${idgroup}`,
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

export const keepReport = async (idreport, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/keepReport`,
      { idreport },
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

export const removeReport = async (idreport, postRef, commentRef , token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/removeReport`,
      { idreport, postRef  , commentRef},
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
