
import  UI  from './utils/UI.js';
import { api } from './server/api.js';
import { isUserLogin } from './utils/is-user-login.js';

const state = {
  posts: [],
};

function createHomeLayout() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "./index.html" }, "Log In"),
      UI.createElement("a", { href: "./registration.html" }, "Submit"),
      UI.createElement('button', { id: 'logoutButton', class: 'button' }, 'Logout')
    ]),

    UI.createElement("main", { class: "main-section" }, [
      UI.createElement("nav", { class: "sidebar" }, [
        UI.createElement("div", { class: "sidebar-title" }, "Bloggers"),
        UI.createElement("div", { class: 'blogger-container' },
          UI.createElement("div", { class: 'blogger-card' }, [
            UI.createElement("img", { class: 'blogger-card-avatar' })
          ])
        )
      ]),

      UI.createElement("section", { class: "box" }, [
        UI.createElement("div", { class: "creat-box" }, [
          UI.createElement('button', { class: 'buttton', id: 'createBlogbutton' }, 'Create Blog')
        ]),
        UI.createElement("div", { class: "post-box" }),
      ]),

      UI.createElement("section", { class: "box" }, "Section2"),
      createFooter(),
    ]),
  ]);

  container.querySelector("#createBlogbutton").addEventListener('click', () => {
    window.location.href = "./createblog.html";
  });

  const logoutButton = container.querySelector("#logoutButton");
  logoutButton.addEventListener('click', () => {
    logoutUser();
  });

  const postBox = container.querySelector('.post-box');
  postBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
      const postId = e.target.dataset.id;
      handleDelete(postId);
    } else if (e.target.classList.contains('edit-button')) {
      const postId = e.target.dataset.id;
      handleEdit(postId);
    }
  });

  UI.render(container, document.body);

  loadPosts().then(posts => {
    renderPosts(posts);  
  }).catch(error => {
    console.error('Error loading posts:', error);
  });

  loadUsers().then(users => {
    renderUsers(users);
  }).catch(error => {
    console.error('Error loading users:', error);
  });
}
//////////////////////

function createSection(posts) {
  return posts.map((post) =>
    UI.createElement("div", { class: "creat-box post" }, [
      UI.createElement("div", { class: 'post-text-content' }, [
        UI.createElement("p", { class: 'post-text' }, post.title)
      ]),
      UI.createElement('div', { class: 'post-story' }, [
        UI.createElement("img", { class: 'post-image', src: post.img }),
        UI.createElement("p", { class: 'post-story-text' }, post.story.slice(0, 100) + '...')
      ]),
      UI.createElement("button", { class: 'delete-button', "data-id": post.id }, "Delete"),
      UI.createElement("button", { class: 'edit-button', "data-id": post.id }, "Edit")
    ])
  );
}

function loadPosts() {
  return api.post.getPosts()  
    .then(posts => {
      console.log(posts); 
      state.posts = posts;  
      return posts; 
    })
    .catch(error => {
      console.error('Error:', error);
      return [];  
    });
}

function renderPosts(posts) {
  const postsContainer = document.querySelector('.post-box');
  postsContainer.innerHTML = '';  // Clear the existing posts

  if (posts.length > 0) {
    createSection(posts).forEach(postElement => {
      postsContainer.appendChild(postElement);
    });
  } else {
    const noPostsMessage = UI.createElement('p', { class: 'no-posts-message' }, 'No posts available at the moment.');
    postsContainer.appendChild(noPostsMessage);
  }
}

function renderUsers(users) {
  const userContainer = document.querySelector('.blogger-container');

  if (users.length > 0) {
    users.forEach(user => {
      const bloggerCard = UI.createElement("div", { class: "blogger-card" }, [
        UI.createElement("img", { class: 'blogger-card-avatar', src: user.avatar || '' }),
        UI.createElement('div', { class: 'blogger-card-content' }, `${user.firstName} ${user.lastName}`)
      ]);
      userContainer.appendChild(bloggerCard);
    });
  } else {
    const noBloggersMessage = UI.createElement('p', { class: 'no-users' }, 'Users are not available at the moment.');
    userContainer.appendChild(noBloggersMessage);
  }
}

function loadUsers() {
  return api.user.getUser()
    .then(users => {
      console.log(users);
      return users;
    })
    .catch(error => {
      console.error('Error loading users:', error);
      return [];
    });
}

function logoutUser() {
  localStorage.removeItem('user');
  window.location.href = './index.html';
}

function handleDelete(postId) {
  api.post.delete(postId).then(() => {
    state.posts = state.posts.filter(post => post.id !== postId);
    document.querySelector(".container-root").remove();
    createHomeLayout();
  });
}

function handleEdit(postId) {
  const queryParams = new URLSearchParams({ id: postId });
  window.location.href = `createblog.html?${queryParams.toString()}`;
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

// Check if the user is logged in when the page is loaded
window.onload = function () {
  if (!isUserLogin()) {
    window.location.assign('index.html');
    return;
  }
  createHomeLayout();
};




//version2
// import UI from './utils/UI.js';
// import { api } from './server/api.js';
// import { isUserLogin } from './utils/is-user-login.js';

// const state = {
//   posts: [],
// };

// // Create a new post event handler
// const createNewPost = () => {
//   window.location.assign("createblog.html");
// };

// // Main home layout
// function createHomeLayout() {
//   const createNewPostButton = UI.createElement(
//     "button",
//     { class: "buttton", id: 'createBlogbutton' },
//     "Create Post"
//   );

//   createNewPostButton.addEventListener("click", createNewPost);

//   const container = UI.createElement("div", { class: "container-root" }, [
//     UI.createElement("header", { class: "header" }, [
//       UI.createElement("a", { href: "index.html" }, "Log In"),
//       UI.createElement("a", { href: "registration.html" }, "Sign Up"),
//       UI.createElement('button', { id: 'logoutButton', class: 'button' }, 'Logout')
//     ]),
//     UI.createElement("main", { class: "main-section" }, [
//       createSidebar(),  // Calls the sidebar function
//       UI.createElement("section", { class: "box" }, [
//         UI.createElement("div", { class: "creat-box" }, [
//           createNewPostButton
//         ]),
//         createSection(),  // Creates the post section
//         UI.createElement("section", { class: "box" }, "Section2"),
//         createFooter(),
//       ]),
//     ]),
//   ]);

//   const logoutButton = container.querySelector("#logoutButton");
//   logoutButton.addEventListener('click', () => {
//     logoutUser();
//   });

//   UI.render(container, document.querySelector("body"));
// }

// // Footer creation
// function createFooter() {
//   return UI.createElement("footer", { class: "footer", id: "time-footer" }, Date().toString());
// }

// // Handle deleting a post
// const handleDelete = (id) => {
//   api.post.delete(id).then(() => {
//     state.posts = state.posts.filter((post) => post.id !== id);
//     document.querySelector(".container-root").remove();
//     createHomeLayout();
//   });
// };

// // Handle editing a post
// const handleEdit = (id) => {
//   const queryParams = new URLSearchParams({ id: id });
//   window.location.href = `createblog.html?${queryParams.toString()}`;
// };

// // Render posts in the section
// function createSection() {
//   const elements = state.posts.map((post, index) => {
//     const deleteButton = UI.createElement("button", { class: "delete-button", "data-index": index }, "Delete");

//     deleteButton.addEventListener("click", () => {
//       handleDelete(post.id);
//     });

//     const editButton = UI.createElement("button", { class: "edit-button", "data-index": index }, "Edit");

//     editButton.addEventListener("click", () => {
//       handleEdit(post.id);
//     });

//     return UI.createElement(
//       "div",
//       { class: "creat-box post", "data-index": index },
//       [
//         UI.createElement("div", { class: 'post-text-content' }, [
//           UI.createElement("p", { class: 'post-text' }, post.title)
//         ]),
//         UI.createElement('div', { class: "post-story" }, [
//           UI.createElement("img", {
//             src: post.img,
//             class: "post-image",
//             alt: "Post Image",
//           }),
//           UI.createElement("p", { class: "post-story-text" }, post.story.slice(0, 100) + '...'),
//         ]),
//         deleteButton,
//         editButton
//       ]
//     );
//   });

//   return UI.createElement("section", { class: "box" }, elements);
// }

// // Sidebar creation with bloggers fetched from the API
// function createSidebar() {
//   // Fetch bloggers from the API and display them in the sidebar
//   api.user.getUser().then((bloggers) => {
//     const bloggerContainer = document.querySelector('.blogger-container');
    
//     bloggers.forEach((blogger) => {
//       const bloggerCard = UI.createElement(
//         "div",
//         { class: "blogger-card" },
//         [
//           UI.createElement("img", { class: "blogger-card-avatar", alt: "Avatar" }),
//           UI.createElement(
//             "div", 
//             { class: "blogger-card-content" }, 
//             `${blogger.firstName} ${blogger.lastName}`
//           ),
//         ]
//       );
//       bloggerContainer.appendChild(bloggerCard);
//     });
//   }).catch(error => {
//     console.error("Error loading bloggers:", error);
//   });

//   // Return the sidebar element with bloggers list
//   return UI.createElement("nav", { class: "sidebar" }, [
//     UI.createElement("div", { class: "sidebar-title" }, "Bloggers"),
//     UI.createElement("div", { class: 'blogger-container' }),  // Empty container for dynamic content
//   ]);
// }

// // Initialize posts and home layout
// const initApplicants = () => {
//   try {
//     if (!isUserLogin()) {
//       window.location.assign('index.html');
//       return;
//     }

//     api.post.getPosts().then(data => {
//       state.posts = data;
//       createHomeLayout();
//     });
//   } catch (error) {
//     state.posts = [];
//     console.error("Error loading posts:", error);
//   }
// };

// window.onload = function () {
//   initApplicants();
// };




// function logoutUser() {
//   localStorage.removeItem('user'); 
//   window.location.href = './index.html';  
// }

// setInterval(() => {
//   const footerContainer = document.querySelector("#time-footer");
//   if (footerContainer) {
//     footerContainer.innerText = Date().toString();
//   }
// }, 1000);
