import UI from './utils/UI.js';
import { Storage as StorageUtil } from './utils/storage.js';
import { validateNotEmpty,  ValidationError } from './utils/validation.js';

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

                    UI.createElement("label", { for: "imageLink" }, "Image Link (URL)"),
                    UI.createElement("input", { type: "url", id: "imageLink", placeholder: "Enter image URL" }),

                    UI.createElement("button", { type: "submit", class: 'button' }, "Create Post")
                ]),
            ], 'Create a New Post'),
        ]),  
    ]);

    const form = container.querySelector('#createPostForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        //  data
        const title = document.getElementById('title').value;
        const story = document.getElementById('story').value;
        const imageLink = document.getElementById('imageLink').value;

        try {
            validateNotEmpty(title, "Title");
            validateNotEmpty(story, "Story");         

            const newPost = {
                title: title,
                story: story,
                img: imageLink,
            };

            let posts = StorageUtil.get('posts'); 

            posts.push(newPost);

            StorageUtil.save('posts', posts);

            window.location.href = './home.html';

        } catch (error) {
            if (error instanceof ValidationError) {
                alert(error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    });

    UI.render(container, document.body);
}

createBlogLayout();
