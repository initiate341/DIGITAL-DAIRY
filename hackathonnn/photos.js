// Retrieve photos from localStorage and display them
document.addEventListener("DOMContentLoaded", () => {
  const photoContainer = document.getElementById("photo-container");

  // Get stored photos from localStorage
  const storedPhotos = JSON.parse(localStorage.getItem("photos")) || [];

  if (storedPhotos.length === 0) {
    photoContainer.innerHTML = "<p>No photos uploaded yet!</p>";
  } else {
    // Display each photo with a delete button
    storedPhotos.forEach((photoSrc, index) => {
      const photoWrapper = document.createElement("div");
      photoWrapper.className = "photo-wrapper"; // Wrapper for image and delete button

      const img = document.createElement("img");
      img.src = photoSrc;
      img.alt = "Uploaded Photo";
      img.className = "gallery-photo";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.dataset.index = index; // Set the index for deletion

      // Add event listener to delete button
      deleteButton.addEventListener("click", () => {
        deleteImage(index);
      });

      photoWrapper.appendChild(img);
      photoWrapper.appendChild(deleteButton);
      photoContainer.appendChild(photoWrapper);
    });
  }
});

// Function to delete an image
function deleteImage(index) {
  // Get stored photos
  const storedPhotos = JSON.parse(localStorage.getItem("photos")) || [];

  // Remove the selected photo
  storedPhotos.splice(index, 1);

  // Update localStorage
  localStorage.setItem("photos", JSON.stringify(storedPhotos));

  // Refresh the gallery
  window.location.reload();
}

// Logout functionality
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
