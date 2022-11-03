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

// submit and edit post
const submitPost = async () => {
  try {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const data = {
      title,
      body,
    };
    const res = await http.createPost(data);
    console.log("submitPost :>> ", res);
    ui.showAlert("Post Added", "alert alert-success");
    ui.clearFields();
    getPosts();
  } catch (error) {
    console.log(error);
  }
};

//get posts on DOm load
document.addEventListener("DOMContentLoaded", getPosts);

//listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);
