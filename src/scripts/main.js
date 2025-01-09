import UI from './utils/UI.js';
// import { validateEmail } from './utils/validation.js';
import {Storage} from './utils/storage.js';
import {User} from './server/user.api.js';



const handleLogin = async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const credentials = {
      email, 
      password
    }
    const api = new User()
    const result = await api.auth.login(credentials);
  
    if (result.accessToken && result.user) {
      Storage.set('token', result.accessToken);
      Storage.set('user', result.user);
      window.location.assign("home.html");  
    } else {
      alert('Something Wrong')
    }
    
    
    console.log(credentials);
  }
  
  
function createLoginLayout() {
    const container = UI.createElement("div", { class: "container-root" }, [
        UI.createElement("header", { class: "header" }, [
            UI.createElement("a", { href: "./home.html" }, "Home"),
            UI.createElement("a", { href: "./registration.html" }, "Submit"),
        ]),

        UI.createElement("div", { class: "form-wrapper" }, [
            UI.createElement("div", { class: "login-container" }, [
                UI.createElement("form", {}, [
                    UI.createElement("input", { type: "text", id: "email", placeholder: "Email", required: true }),
                    UI.createElement("input", { type: "password", id: "password", placeholder: "Password", required: true }),
                    UI.createElement("button", { type: "submit" }, "Login")
                ]),
            ]),
        ]),
    ]);

    const form = container.querySelector('form');
    //const button = container.querySelector('button[type="submit"]');

    form.addEventListener('submit', handleLogin);


    UI.render(container, document.body);
}



createLoginLayout();
