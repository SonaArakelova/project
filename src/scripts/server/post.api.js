// Post.js - Post-related methods
import { API } from '../server/api.js'; 

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





//teacher
// import { BaseApi } from "./base.js";
// import { Storage } from "../utils/storage.js";

// export class PostApi extends BaseApi {
//   constructor(baseUrl) {
//     super();
//     this.baseUrl = baseUrl;
//   }

//   async getPosts() {
//     try {
//       const response = await fetch(this.getFullUrl("/posts"));

//       if (response.status !== 200) {
//         throw new Error(response.statusText);
//       }

//       const posts = await response.json();

//       return posts;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async getPostById(id) {
//     try {
//       if (!id) {
//         throw new Error("Id is Required");
//       }
//       const token = Storage.getItem("token");

//       const response = await fetch(this.getFullUrl(`/posts/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       }));

//       this.validateResponse(response);

//       if (response.status !== 200) {
//         throw new Error(response.statusText);
//       }

//       const post = await response.json();

//       return post;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async create(post) {
//     try {
//       const response = await fetch(this.getFullUrl("/posts"), {
//         method: "POST",
//         body: JSON.stringify(post),
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       this.validateResponse(response);

//       const result = await response.json();

//       return result;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async update(id, post) {
//     try {
//       const token = Storage.getItem("token");

//       const response = await fetch(this.getFullUrl(`/posts/${id}`), {
//         method: "PUT",
//         body: JSON.stringify(post),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       this.validateResponse(response);

//       const result = await response.json();

//       return result;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async delete(id) {
//     try {
//       const token = Storage.getItem("token");

//       const response = await fetch(this.getFullUrl(`/posts/${id}`), {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       this.validateResponse(response);

//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getFullUrl(endpoint) {
//     return `${this.baseUrl}${endpoint}`;
//   }
// }