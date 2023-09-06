// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if the user is authenticated (you might have a global variable or session information)
//   const isAuthenticated = /* Check user's authentication status */;

  // Select relevant DOM elements
  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('comment-list');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const logoutButton = document.getElementById('logout-button');
  const navigationLinks = document.querySelectorAll('.nav-link');
  
  // Function to handle adding comments
  const addComment = async (text, postId) => {
    try {
      // Make an AJAX request to add the comment
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        // Comment added successfully, update the UI
        const comment = await response.json();
        const commentItem = document.createElement('li');
        commentItem.textContent = comment.text;
        commentList.appendChild(commentItem);
      } else {
        // Handle error response
        console.error('Error adding comment');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  // Event listener for comment submission
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const commentText = document.getElementById('comment-text').value;
    const postId = document.getElementById('post-id').value;
    addComment(commentText, postId);
  });

  // Event listener for user authentication (login)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;
    
    // Make an AJAX request to authenticate the user
    // Handle authentication success or failure
    // Redirect to the dashboard or show an error message
  });

  // Event listener for user registration (signup)
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-signup').value;
    const password = document.getElementById('password-signup').value;
    
    // Make an AJAX request to register the user
    // Handle registration success or failure
    // Redirect to the dashboard or show an error message
  });

  // Event listener for user logout
  logoutButton.addEventListener('click', async () => {
    // Make an AJAX request to log the user out
    // Handle logout success or failure
    // Redirect to the home page or show an error message
  });

  // Event listener for navigation links
  navigationLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      // Use client-side routing or navigate to the appropriate page
    });
  });
});
