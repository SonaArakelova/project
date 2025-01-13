import UI from './utils/UI.js';
import { api } from './server/api.js';

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
                        UI.createElement("input", {id:"firstName", type: "text", placeholder: "First Name", required: true }),
                        UI.createElement("input", {id:"lastName", type: "text", placeholder: "Last Name", required: true }),
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
                        UI.createElement("input", {type: "text", placeholder: "Username", id:'username', required: true }),
                        UI.createElement("input", { type: "password", placeholder: "Password", id:'password', required: true }),
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
                        UI.createElement("button", { type: "submit", id:'registr' }, "Submit"),
                    ]),
                ]),
            ]),
        ]),
    ]);

    UI.render(container, document.body);

    const submitButton = document.getElementById('registr');

    const handelSubmit = async (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const username = document.getElementById('username').value.trim();

        const user = {
            firstName,
            lastName,
            email, 
            password,
            username
        };

        console.log(user);

        const result = await api.auth.register(user);
        console.log(result);

        if (result.id) {
            window.location.assign("index.html");
        } else {
            alert("Something went wrong. Please check your data.");
        }
    };

    submitButton.addEventListener('click', handelSubmit);

  
}

createRegistrationLayout();
