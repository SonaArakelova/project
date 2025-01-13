import UI from './utils/UI.js';
//import { validateNotEmpty, ValidationError } from './utils/validation.js';
import { api } from './server/api.js'
import { Storage } from "./utils/storage.js";



function createBlogLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./index.html" }, "Log In"),
            UI.createElement("a", { href: "./registration.html" }, "Submit"),
        ]),

        UI.createElement("div", { class: "form-wrapper" }, [
            UI.createElement("div", { class: "post-container" }, [
                UI.createElement("form", { class: 'createPostForm', id: 'createPostForm' }, [
                    UI.createElement("label", { for: "title" }, "Title of the Post"),
                    UI.createElement("input", { type: "text", id: "title", placeholder: "Enter post title", required: true }),

                    UI.createElement("label", { for: "story" }, "Content of the Post"),
                    UI.createElement("textarea", { type: "text", id: "story", placeholder: "Write your story here", required: true }),

                    UI.createElement("label", { for: "authorName" }, "Author of the Post"),
                    UI.createElement("input", { type: "text", id: "authorName", placeholder: "Write author name", required: true }),


                    UI.createElement("label", { for: "file-upload" }, ),
                    UI.createElement("input", { type: "file", id: "file-upload" }),

                    UI.createElement("button", { type: "submit", class: 'button', id:"createPost"}, "Create Post")
                ]),
            ], 'Create a New Post'),
        ]),
    ]);

   
    

    UI.render(container, document.body);

    const form = container.querySelector('#createPost');
    form.addEventListener("click", createPostHandler); 
};



function initApplicants() {
    createBlogLayout();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const postId = searchParams.get("id");

    api.post.getPostById(postId).then(post => {
      document.getElementById("postTitle").value = post.title;
      document.getElementById("postStory").value = post.story;
      document.getElementById("postImage").value = post.img ? post.img : "";   
    }).catch(() => {
      window.location.assign("home.html");
    })
  }

}

initApplicants();


async function createPostHandler(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const story = document.getElementById("story").value.trim();
  const fileUpload = document.getElementById("file-upload");

  const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);

  if (!title || !story || !fileUpload.files.length) {
    alert("Please fill in all fields.");
    return;
  }

  const user = Storage.getItem('user');

  const newPost = {
    title,
    story,
    authorName: user.username,
    img: uploadedFile.url,
    userId: user.id
  };

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get("id");

  if (id) {
    api.post.update(id, newPost).then((post) => {
      console.log(post);
      window.location.assign("home.html");  
    });
  } else {
    api.post.create(newPost).then((post) => {
      console.log(post);
      window.location.assign("home.html");
    });
  }
}
