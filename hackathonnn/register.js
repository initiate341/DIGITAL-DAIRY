document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the username and password from the input fields
  const newUsername = document.getElementById("new-username").value.trim();
  const newPassword = document.getElementById("new-password").value.trim();

  // Retrieve users from localStorage or initialize an empty object if none exist
  const users = JSON.parse(localStorage.getItem("users")) || {};

  // Check if the username already exists
  if (users[newUsername]) {
    document.getElementById("register-error-message").textContent = "Username already exists!";
    return;
  }

  // Add the new user with their details to the users object
  users[newUsername] = {
    password: newPassword,
    entries: [] // Initialize with an empty entries array for this user
  };

  // Save the updated users object back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Automatically log in the user after successful registration
  localStorage.setItem("currentUser", newUsername);

  // Redirect to the main diary page
  alert("Registration successful! Redirecting to your diary...");
  window.location.href = "diary.html"; // Ensure the file path is correct
});
