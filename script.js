// registration.js

async function registerUser() {
  const registrationForm = document.getElementById('registrationForm');
  const formData = new FormData(registrationForm);

  try {
    const response = await fetch('http://localhost:2000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      const result = await response.json();
      alert(`User registered successfully!\n${result.message}`);
      // You may redirect the user to a login page or perform other actions here
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert(`An error occurred during registration. Please try again.\n${error.message}`);
  }
  
}

  