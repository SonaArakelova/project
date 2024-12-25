
// export class API {
//   constructor(baseUrl) {
//       this.baseUrl = baseUrl;  
//   }

//   getPost() {
//       return fetch(`${this.baseUrl}/api/posts`)  
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Posts not found: ' + response.statusText);
//               }
             
//               return response.json() ;
//           })
//           .catch(error => {
//               console.error('Error in GET request for posts:', error);
//               throw error;
//           });
//   }

//   getUser() {
//     return fetch(`${this.baseUrl}/api/users`)  
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('user not found: ' + response.statusText);
//             }
           
//             return response.json() ;
//         })
//         .catch(error => {
//             console.error('Error in GET request for users:', error);
//             throw error;
//         });
// }

//   delete(id) {
//       if (id){
//           return fetch(`${this.baseUrl}/api/posts/${id}`, {
//               method: 'DELETE'
//           })
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Failed to delete: ' + response.statusText);
//               }
  
//               if (response.status === 204) {
//                   return ; 
//               }
  
//           })
//           .catch(error => {
//               console.error('Error in DELETE request:', error);
//               throw error;
//           });
//       } else {
//           throw new Error("ID not provided");
//       }

//   }




//   post(postData){
//     return fetch(`${this.baseUrl}/api/posts`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.text().then(errorText => {
//                 throw new Error('Failed to create post: ' + response.statusText + ' - ' + errorText);
//             });
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         throw error;
//     });
// };


// postUser(userData) {
//     return fetch(`${this.baseUrl}/api/auth/register`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     })
//     .then(response => {
//         if (!response.ok) {
//             return response.text().then(errorText => {
//                 throw new Error('Failed to create user: ' + response.statusText + ' - ' + errorText);
//             });
//         }
//         return response.json();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         throw error;
//     });
// }



//   update(postId, updatedPost) {
//       return fetch(`${this.baseUrl}/api/posts/${postId}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedPost ) 
//       })
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Failed to update post: ' + response.statusText);
//           }
//           return response.json() ;
//       })
//       .catch(error => {
//           console.error('Error', error);
//           throw error;
//       })
//   }
  
  
// }

// API.js - The base API class to handle the base URL
export class API {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;  
    }
  }
  