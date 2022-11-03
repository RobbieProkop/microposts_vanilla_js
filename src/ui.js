class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formState = "add";
  }

  //geting all posts
  showPosts(posts) {
    let output = "";

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    //create div
    const div = document.createElement("div");
    //add classes
    div.className = className;

    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".postsContainer");
    //get post div
    const posts = document.querySelector("#posts");
    //insert alert
    container.insertBefore(div, posts);

    //clear after 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  //used to fill the form on edit state
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  //clear Id input
  clearIdInput() {
    this.idInput.value = "";
  }

  //change the form state
  changeFormState(state) {
    if (state !== "edit") {
      this.postSubmit.textContent = "Post It!";
      this.postSubmit.className = "post-submit btn btn-primary mt-3";

      //clear id from hidden field
      this.clearIdInput();
      //clear text fields
      this.clearFields();
    }
    if (document.querySelector(".post-cancel")) {
      document.querySelector(".post-cancel").remove();
    }
    if (state === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning mt-3";

      //create cancel btn
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-dark mt-3";
      button.appendChild(document.createTextNode("Cancel Edit"));

      //get parent to insert into dom
      const cardForm = document.querySelector(".card-form");

      // span to insert before
      const formEnd = document.querySelector(".form-end");

      //insert cancel button
      cardForm.insertBefore(button, formEnd);
    }
    this.formState = state;
  }
}

export const ui = new UI();
