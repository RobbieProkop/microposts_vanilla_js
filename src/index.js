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
    const title = document.querySelector("#title");
    const body = document.querySelector("#body");
    title.classList.remove("is-invalid");
    body.classList.remove("is-invalid");
    if (!title.value || !body.value) {
      if (!title.value) {
        title.classList.add("is-invalid");
      }
      if (!body.value) {
        body.classList.add("is-invalid");
      }
      ui.showAlert("Please add all fields", "alert alert-danger");
      return;
    }

    const data = {
      title: title.value,
      body: body.value,
    };
    const res = await http.createPost(data);
    ui.showAlert("Post Added", "alert alert-success");
    ui.clearFields();
    getPosts();
  } catch (error) {
    console.log(error);
  }
};

//delete
const deletePost = async (e) => {
  try {
    e.preventDefault();

    if (e.target.parentElement.classList.contains("delete")) {
      const id = e.target.parentElement.dataset.id;
      if (confirm("Are you sure you want to delete?")) {
        const res = await http.deletePost(id);
        ui.showAlert("Post Deleted", "alert alert-success");
        getPosts();
      }
    }
  } catch (error) {
    ui.showAlert("Post could not be deleted", "alert alert-danger");
    console.log("error :>> ", error);
  }
};

//edit state
const enableEdit = async (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body,
    };
    //fill form with current post
    ui.fillForm(data);
  }
};

//get posts on DOm load
document.addEventListener("DOMContentLoaded", getPosts);
//listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

//listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

//listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

//listen for cancel edit post
// document
//   .querySelector(".post-cancel")
//   .addEventListener("click", changeFormState("add"));
