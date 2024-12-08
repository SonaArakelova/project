import UI from './utils/UI.js';
import { validateEmail } from './utils/validation.js';

function createLoginLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./registration.html" }, "Submit"),
        ]),

        UI.createElement("div", { class: "form-wrapper" }, [
            UI.createElement("div", { class: "login-container" }, [
                UI.createElement("form", {}, [
                    UI.createElement("input", { type: "text", id: "username", placeholder: "Username", required: true }),
                    UI.createElement("input", { type: "password", id: "password", placeholder: "Password", required: true }),
                    UI.createElement("button", { type: "submit" }, "Login")
                ]),
            ]),
        ]),
    ]);

    const form = container.querySelector('form');
    const button = container.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validate 
        try {
            validateEmail(username);  
        } catch (error) {
            alert(error.message);  
            return;  
        }

        
        if (password.trim() === "") {
            alert("Password cannot be empty");
            return;
        }

        console.log("Logging in with", username, password);  

        window.location.href = "./home.html"; 
    });

    UI.render(container, document.body);
}

createLoginLayout();
