import axios from "axios";

export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `http://35.194.224.95:81/comment`,
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
      `http://35.194.224.95:81/commentInComment`,
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
      `http://35.194.224.95:81/getComment/${postId}`,

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
      `http://35.194.224.95:81/getCommentInComment/${commentId}`,

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
      `http://35.194.224.95:81/reactComment`,
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
      `http://35.194.224.95:81/getReactsComment/${commentId}`,

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
      `http://35.194.224.95:81/getCountCommentInPost/${postId}`,

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