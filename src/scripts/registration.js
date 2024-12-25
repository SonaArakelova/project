import UI from './utils/UI.js';
import {User} from './server/user.api.js';





function createRegistrationLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./index.html" }, "Log In"), 
        ]),
        
        // Form wrapper
        UI.createElement("div", { class: "form-wrapper" }, [
            UI.createElement("div", { class: "submit-container" }, [
                UI.createElement("form", { id: 'createUserForm' }, [
                    UI.createElement("div", { class: "input-group" }, [
                        UI.createElement("input", { type: "text", placeholder: "First Name", required: true }),
                        UI.createElement("input", { type: "text", placeholder: "Last Name", required: true }),
                        UI.createElement("select", { name: "city", required: true }, [
                            UI.createElement("option", { value: "", disabled: true, selected: true }, "City"),
                            UI.createElement("option", { value: "new-york" }, "New York"),
                            UI.createElement("option", { value: "los-angeles" }, "Los Angeles"),
                            UI.createElement("option", { value: "chicago" }, "Chicago"),
                            UI.createElement("option", { value: "houston" }, "Houston"),
                            UI.createElement("option", { value: "miami" }, "Miami"),
                            UI.createElement("option", { value: "san-francisco" }, "San Francisco"),
                            UI.createElement("option", { value: "boston" }, "Boston"),
                            UI.createElement("option", { value: "seattle" }, "Seattle"),
                        ]),
                        UI.createElement("input", { type: "email", placeholder: "Email", id:'email', required: true }),
                        UI.createElement("input", { type: "text", placeholder: "Username", id:'username', required: true }),
                        UI.createElement("input", { type: "password", placeholder: "password", id:'password', required: true }),

                    ]),
                    UI.createElement("div", { class: "gender" }, [
                        UI.createElement("div", { class: "gender-option" }, [
                            UI.createElement("input", { type: "radio", id: "male", name: "gender", value: "male", required: true }),
                            UI.createElement("label", { for: "male" }, "Male"),
                        ]),
                        UI.createElement("div", { class: "gender-option" }, [
                            UI.createElement("input", { type: "radio", id: "female", name: "gender", value: "female" }),
                            UI.createElement("label", { for: "female" }, "Female"),
                        ]),
                    ]),
                    UI.createElement("div", { class: "submit" }, [
                        UI.createElement("div", { class: "email-checkbox" }, [
                            UI.createElement("input", { type: "checkbox", id: "subscribe", name: "subscribe" }),
                            UI.createElement("label", { for: "subscribe" }, "Send me Email"),
                        ]),
                        UI.createElement("button", { type: "submit" }, "Submit"),
                    ]),
                ]),
            ]),
        ]),
    ]);

    const form = container.querySelector('#createUserForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();


        const lastName = document.querySelector('[placeholder="Last Name"]').value;
        const firstName = document.querySelector('[placeholder="First Name"]').value;
        const email = document.getElementById('email').value;
        const username= document.getElementById('username').value;
        const password = document.getElementById('password').value


        createNewUser(lastName, firstName, email,username,password).then(user => {
            window.location.href = './home.html';
        });
    })


    UI.render(container, document.body);
}

createRegistrationLayout();




// function createNewUser(lastName, firstName, email, username, password){
// const userData = {
//         lastName: lastName,
//         firstName: firstName,
//         email: email,
//         username: username,
//         password: password
// };


// return new User('https://simple-blog-api-red.vercel.app')
// .postUser(userData)
// .then(user=>{
//     console.log('User created:' , user);
    
//     window.location.href = '/home.html';
//     return user;

// })
// .catch(error => {
//     console.error('Error creating user:', error);
//     if (error.response) {
//         console.error('Error response:', error.response);  
//     }
//     if (error.message) {
//         console.error('Error message:', error.message); 
//     }
//     throw error;  
// });

// }


async function createNewUser(lastName, firstName, email, username, password) {
    const userData = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        username: username,
        password: password,
    };

    try {
        const userAPI = new User('https://simple-blog-api-red.vercel.app');

        const user = await userAPI.postUser(userData);
        console.log('User created:', user);

        localStorage.setItem('user', JSON.stringify(user));  

        window.location.href = './home.html';
        return user;

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

  

