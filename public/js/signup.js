//when a user signs up, they must input this information, then they are added to the database as a user
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const school = document.querySelector('#school-signup').value.trim();
  const major = document.querySelector('#username-major').value.trim();
  const clubs = document.querySelector('#username-club').value.trim();
    if (username && email && password && school && major && clubs) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, school, major, clubs}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
  };

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);