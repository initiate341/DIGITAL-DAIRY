document.addEventListener('DOMContentLoaded', () => {
  const memories = [];  // Array to store the memories (text + image)
  const memoryText = document.getElementById('memory-text');
  const imageUpload = document.getElementById('image-upload');
  const imagePreview = document.getElementById('image-preview');
  const themeToggle = document.getElementById('theme-toggle');
  const logoutButton = document.getElementById('logout-button');

  // Save Memory (text + image)
  document.getElementById('save-memory').addEventListener('click', () => {
    const memoryTextValue = memoryText.value.trim();
    const imageSrc = imagePreview.querySelector('img')?.src;

    if (!memoryTextValue) {
      alert('Please write something before saving!');
      return;
    }

    // Create memory entry (text + image URL)
    const memoryEntry = {
      text: memoryTextValue,
      image: imageSrc || null,
    };

    memories.push(memoryEntry);  // Add memory to the array
    memoryText.value = '';  // Clear the text input
    imagePreview.innerHTML = '';  // Clear the image preview
    alert('Memory saved!');
  });

  // Image upload and preview
  imageUpload.addEventListener('change', (event) => {
    imagePreview.innerHTML = '';  // Clear previous image preview
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'preview-image';
        imagePreview.appendChild(img);  // Show image preview
      };
      reader.readAsDataURL(file);
    }
  });

  // Speech Recognition setup (optional feature)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening until manually stopped
    recognition.interimResults = true; // Show interim results while speaking
    recognition.lang = 'en-US'; // Set the language for recognition

    const voiceButton = document.getElementById('start-voice');
    const textArea = document.getElementById('memory-text');

    let isListening = false;

    // Start/Stop voice recognition
    voiceButton.addEventListener('click', () => {
      if (!isListening) {
        recognition.start();
        isListening = true;
        voiceButton.textContent = '🛑 Stop Voice Typing';
      } else {
        recognition.stop();
        isListening = false;
        voiceButton.textContent = '🎤 Start Voice Typing';
      }
    });

    // Update text area with recognized speech
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      textArea.value = transcript;
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();  // Restart if it ends unexpectedly
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      alert(`Error: ${event.error}. Please check your microphone or try again.`);
    };
  }

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
  });

  // Logout functionality
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });

  // Save as PDF with text and image
  const saveAsPdfButton = document.getElementById('save-as-pdf');

  saveAsPdfButton.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont('Poppins', 'normal');  // Use custom font
    doc.setFontSize(14);

    // Add a background color or image to the PDF
    doc.setFillColor(255, 223, 186); // Light peach background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Fill background

    // Introduction text
    const introduction = `
      Welcome to Friendship Diary\n
      Where memories are cherished forever.\n
    `;
    doc.text(introduction, 10, 10);  // Add introduction text

    let yOffset = 30;  // Start position for memory content

    // Loop through memories to add text and image to the PDF
    for (let i = 0; i < memories.length; i++) {
      const memory = memories[i];

      // Add memory text
      doc.text(`Memory ${i + 1}:`, 10, yOffset);
      yOffset += 10;

      const memoryLines = doc.splitTextToSize(memory.text, 180);  // Split text into lines if it's too long
      doc.text(memoryLines, 10, yOffset);

      yOffset += memoryLines.length * 10 + 10;  // Adjust position for next content

      // Add image if exists
      if (memory.image) {
        const img = new Image();
        img.src = memory.image;
        img.onload = () => {
          doc.addImage(img, 'JPEG', 10, yOffset, 180, 120);  // Add image to PDF
          yOffset += 130;  // Adjust yOffset after adding the image
          doc.save('friendship-diary.pdf');  // Save the PDF after all content
        };
      } else {
        doc.text('No image available for this memory.', 10, yOffset);
        yOffset += 10;
      }

      yOffset += 10;  // Extra space after each memory
    }

    // Clear the memories array after generating the PDF (reset state)
    memories.length = 0;  // This will reset the memories array
  });
});
