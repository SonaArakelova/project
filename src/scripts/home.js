import UI from './utils/UI.js';
import {bloggers, posts} from "./data.js";

function createHomeLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "./index.html" }, "Log In"),
      UI.createElement("a", { href: "./registration.html" }, "Submit"),
    ]),
  
    UI.createElement("main", { class: "main-section" }, [
      UI.createElement("nav", { class: "sidebar" }, [
        UI.createElement("div", { class: "sidebar-title" }, "Bloggers"),
        UI.createElement("div", { class: 'blogger-container' }, bloggers.map(blogger => 
          UI.createElement("div", { class: 'blogger-card' }, [
            UI.createElement("img", { 
              class: 'blogger-card-avatar', 
              src: blogger.avatar, 
            }),
            UI.createElement("div", { class: 'blogger-card-content' }, `${blogger.firstName} ${blogger.lastName}`)
          ])
        ))
      ]),
  
        UI.createElement("div", { class: "section" }, [
          UI.createElement("section", { class: "box" },[
            UI.createElement("div", { class: "creat-box" }, [
              UI.createElement('button', {class: 'buttton' }, 'Create Blog')
            ]),
            

            ...posts.map(post =>
            UI.createElement("div", { class: "post" }, [
              UI.createElement("div", { class: 'post-text-content' }, [
                UI.createElement("p", { class: 'post-text' }, `${post.authorName}`),
                UI.createElement("p", { class: 'post-text' }, `${post.title}`)
              ]),
              UI.createElement('div', { class: 'post-story' }, [
                UI.createElement("img", { class: 'post-image', src: post.img }),
                UI.createElement("p", { class: 'post-story-text' }, `${post.story}`)
              ])
            ])
          ),

          ...getPostsFromStorage().map((post, index) =>
            UI.createElement("div", { class: "creat-box post", "data-index": index }, [
              UI.createElement("div", { class: 'post-text-content' }, [
                UI.createElement("p", { class: 'post-text' }, post.title)
              ]),
              UI.createElement('div', { class: 'post-story' }, [
                UI.createElement("img", { class: 'post-image', src: post.img }),
                UI.createElement("p", { class: 'post-story-text' }, post.story.slice(0, 100) + '...') // Preview
              ]),
              UI.createElement("button", { class: 'delete-button', 'data-index': index}, "Delete")
            ])
        )

        ]
        ),

        
        UI.createElement("section", { class: "box" }, "Section2"),
        createFooter(),
      ]),
    ]),
    ]);


    container.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('delete-button')) {
        deletePost(event);
      }
    });


  const button = container.querySelector('button');
  
    button.addEventListener('click', function(event) {
        window.location.href = "./createblog.html"; 
    });

  UI.render(container, document.body);
}


function getPostsFromStorage() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}


// delete a post from localStorage
function deletePost(event) {
  if (event.target && event.target.classList.contains('delete-button')) {
    const deleteButton = event.target;
    const index = deleteButton.getAttribute('data-index');
    const postElement = deleteButton.closest('.post');

    // Removin post from the array in localStorage
    let posts = getPostsFromStorage();
    posts.splice(index, 1); 
    localStorage.setItem('posts', JSON.stringify(posts));  
    
    
    if (postElement) {
      postElement.style.display = 'none';  
    }

    document.body.innerHTML = '';  
    createHomeLayout(); 
  }
}


function createFooter() {
  return UI.createElement("footer", { class: "footer", id: "time-footer" }, Date().toString());
}


setInterval(() => {
  const footer = createFooter();
  const footerContainer = document.querySelector("#time-footer");

  if (footerContainer) {
      footerContainer.innerText = Date().toString(); // Update the footer text instead of removing it
  } else {
      const section = document.querySelector("div.section");
      UI.render(footer, section); // Append footer if it doesn't exist
  }
}, 1000);

createHomeLayout();
