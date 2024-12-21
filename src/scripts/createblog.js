import UI from './utils/UI.js';
import { validateNotEmpty, ValidationError } from './utils/validation.js';
import { API } from './API/server.js';

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


                    UI.createElement("label", { for: "img" }, "Image Link (URL)"),
                    UI.createElement("input", { type: "url", id: "img", placeholder: "Enter image URL" }),

                    UI.createElement("button", { type: "submit", class: 'button' }, "Create Post")
                ]),
            ], 'Create a New Post'),
        ]),
    ]);

    const form = container.querySelector('#createPostForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const story = document.getElementById('story').value;
        const img = document.getElementById('img').value;
        const  authorName= document.getElementById('authorName').value;


        try {
            validateNotEmpty(title, "Title");
            validateNotEmpty(story, "Story");

            createNewPost(title, story, authorName, img).then(post => {
                window.location.href = './home.html';
            });

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

function createNewPost(title,story,authorName,img) {
    const postData = {
        title:title,
        story:story,
        authorName:authorName,
        img:img || '',  
    };


    return new API('https://simple-blog-api-red.vercel.app')
    .post('/posts', postData)  
    .then(post => {
        console.log('Post created:', post);  
        
        // const postId = post.id;
        // console.log('New Post ID:', postId); 

       
        window.location.href = '/home.html';
        return post;  
    })  
    .catch(error => {
        console.error('Error creating post:', error);
        if (error.response) {
            console.error('Error response:', error.response);  
        }
        if (error.message) {
            console.error('Error message:', error.message); 
        }
        throw error;  
    });
}
