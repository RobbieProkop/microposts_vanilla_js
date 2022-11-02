import http from "./http";

const getPosts = async () => {
  try {
    console.log(" get posts:>> ", await http.getPosts());
    return await http.getPosts();
  } catch (error) {
    console.log(error);
  }
};

//get posts on DOm load
document.addEventListener("DOMContentLoaded", getPosts);
