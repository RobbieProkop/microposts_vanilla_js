import axios from "axios";

const API_URL = "http://localhost:3000/posts/";

export const getPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await axios.post(API_URL, postData);
  return data;
};

//edit
export const editPost = async (postId, postData) => {
  const { data } = await axios.put(API_URL + postId, postData);
};

//delete
export const deletePost = async (postId) => {
  const { data } = await axios.delete(API_URL + postId);

  return postId;
};

const http = {
  getPosts,
  createPost,
  editPost,
  deletePost,
};

export default http;
