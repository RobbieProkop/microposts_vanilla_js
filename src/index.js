import http from "./http";
import { ui } from "./ui";

const getPosts = async () => {
  try {
    const data = await http.getPosts();
    console.log("get posts :>> ", data);
    ui.showPosts(data);
  } catch (error) {
    console.log(error);
  }
};

//get posts on DOm load
document.addEventListener("DOMContentLoaded", getPosts);
