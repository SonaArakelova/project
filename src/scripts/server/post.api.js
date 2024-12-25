// Post.js - Post-related methods
import { API } from './api.js'; 

export class Post extends API {
  getPost() {
    return fetch(`${this.baseUrl}/api/posts`)  
      .then(response => {
        if (!response.ok) {
          throw new Error('Posts not found: ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error in GET request for posts:', error);
        throw error;
      });
  }


  post(postData) {
    return fetch(`${this.baseUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorText => {
          throw new Error('Failed to create post: ' + response.statusText + ' - ' + errorText);
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
  }

  delete(id) {
    if (id) {
      return fetch(`${this.baseUrl}/api/posts/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete: ' + response.statusText);
        }
        if (response.status === 204) {
          return;  
        }
      })
      .catch(error => {
        console.error('Error in DELETE request:', error);
        throw error;
      });
    } else {
      throw new Error("ID not provided");
    }
  }

  update(postId, updatedPost) {
    return fetch(`${this.baseUrl}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update post: ' + response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error', error);
      throw error;
    });
  }
}
