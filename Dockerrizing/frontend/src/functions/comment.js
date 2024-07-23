import axios from "axios";

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/comment`,
      {
        postId,
        comment,
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

export const commentInComment = async (commentId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/commentInComment`,
      {
        commentId,
        comment,
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

export const getComment = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getComment/${postId}`,

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


export const getCommentInComment = async (commentId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getCommentInComment/${commentId}`,

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


export const reactComment = async (commentId, react, token) => {
  try {
    const { data } = await axios.put(
      `http://backend-service:8000/reactComment`,
      {
        commentId,
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


export const getReactsComment = async (commentId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getReactsComment/${commentId}`,

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


export const getCountCommentInPost = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `http://backend-service:8000/getCountCommentInPost/${postId}`,

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