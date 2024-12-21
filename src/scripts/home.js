import UI from './utils/UI.js';
import {API} from './API/server.js'


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
  
     UI.createElement("section", { class: "box" }, [
          UI.createElement("div", { class: "creat-box" }, [
              UI.createElement('button', {class: 'buttton' }, 'Create Blog')
            ]),
            UI.createElement("div", { class: "post-box" }),
          ]),
            

   

       
          ...getPostsFromStorage().map((post, index) =>
            UI.createElement("div", { class: "creat-box post", "data-index": index }, [
              UI.createElement("div", { class: 'post-text-content' }, [
                UI.createElement("p", { class: 'post-text' }, post.title)
              ]),
              UI.createElement('div', { class: 'post-story' }, [
                UI.createElement("img", { class: 'post-image', src: post.img }),
                UI.createElement("p", { class: 'post-story-text' }, post.story.slice(0, 100) + '...') 
              ]),
              UI.createElement("button", { class: 'delete-button', 'data-index': index}, "Delete")
            ])
        ),
         

        
        UI.createElement("section", { class: "box"}, "Section2"),
        createFooter(),
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


 loadPosts().then(posts => {
  renderPosts(posts);  
}).catch(error => {
  console.error('Error loading posts:', error);
});

}

function loadPosts() {
return new API('https://simple-blog-api-red.vercel.app')  
  .get()  
  .then(posts => {
    console.log(posts);  
    return posts; 
  })
  .catch(error => {
    console.error('Error:', error);
    return []; 
  });
}

function renderPosts(posts) {
  const postsContainer = document.querySelector('.post-box');
  
  postsContainer.innerHTML = '';

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const postCard = UI.createElement("div", { class: "creat-box post", "data-index": index }, [
        UI.createElement("div", { class: 'post-text-content' }, [
          UI.createElement("p", { class: 'post-text' }, post.authorName || 'Anonymous'),
          UI.createElement("p", { class: 'post-text' }, post.title),
        ]),
        UI.createElement('div', { class: 'post-story' }, [
          UI.createElement("img", { class: 'post-image', src: post.img }),
          UI.createElement("p", { class: 'post-story-text' }, post.story.slice(0, 100) + '...'),
        ]),
      ]);
      
      postsContainer.appendChild(postCard);
    });
  } else {
    const noPostsMessage = UI.createElement('p', { class: 'no-posts-message' }, 'No posts available at the moment.');
    postsContainer.appendChild(noPostsMessage);
  }
}





function getPostsFromStorage() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}


function deletePost(event) {
  if (event.target && event.target.classList.contains('delete-button')) {
    const deleteButton = event.target;
    const index = deleteButton.getAttribute('data-index');
    const postElement = deleteButton.closest('.post');

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
      footerContainer.innerText = Date().toString(); 
  } else {
      const section = document.querySelector("div.section");
      UI.render(footer, section); 
  }
}, 1000);


createHomeLayout();
