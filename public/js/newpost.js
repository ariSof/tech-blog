const headerLink = document.getElementById('page-header');
headerLink.innerHTML = "Dashboard";


const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    //const today = new Date();
    const date_created = new Date();
  
    if (content && title && date_created) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, date_created }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.newpost-form')
    .addEventListener('submit', newPostFormHandler);

  