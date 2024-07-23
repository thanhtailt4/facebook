import axios from "axios";
export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  group,
  token
) => {
  try {
    const { data } = await axios.post(
      `http://backend-service:8000/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
        group,
      },
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
export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/reactPost`,
      {
        postId,
        react,
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
export const getReactsPost = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getReactsPost/${postId}`,

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

export const savePost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/savePost/${postId}`,
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
export const deletePost = async (postId, token) => {
  try {
    const { data } = await axios.delete(
      `http://backend-service:8000/deletePost/${postId}`,

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

export const getPost = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getPost/${postId}`,

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

export const getPostByUrl = async (url, token) => {
  try {
    const { data } = await axios.post(
      `http://backend-service:8000/getPostByUrl`,
      {
        url
      },
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


