document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || {};
  
    if (users[username] && users[username].password === password) {
      // Store logged-in user in localStorage
      localStorage.setItem("currentUser", username);
      document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
      
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
      
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || {};
      
        // Validate user credentials
        if (users[username] && users[username].password === password) {
          // Save the current user in localStorage
          localStorage.setItem("currentUser", username);
      
          // Redirect to the diary page
          window.location.href = "diary.html";
        } else {
          // Show an error message
          document.getElementById("login-error-message").textContent = "Invalid username or password!";
        }
      });
      
      // Redirect to the main diary page
      window.location.href = "home.html";
    } else {
      document.getElementById("login-error-message").textContent = "Invalid username or password!";
    }
  });
  