document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission
  
    const name = this.Name.value.trim();
    const email = this.Email.value.trim();
    const message = this.Message.value.trim();
  
    if (name && email && message) {
      alert("Message sent! Thank you, " + name + ".");
      this.reset();
    } else {
      alert("Please fill out all fields.");
    }
  });
  