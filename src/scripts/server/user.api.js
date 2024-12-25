//
import { API } from './api.js';  

export class User extends API {
  getUser() {
    return fetch(`${this.baseUrl}/api/users`)  
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found: ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error in GET request for users:', error);
        throw error;
      });
  }


  postUser(userData) {
    return fetch(`${this.baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error('Failed to create user: ' + response.statusText + ' - ' + errorText);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data && data.token) {
            saveUserDataToLocalStorage(data);
        } else {
            alert('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

 saveUserDataToLocalStorage(data){
    const user = {
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
    };

    localStorage.setItem('user', JSON.stringify(user));
}
}
