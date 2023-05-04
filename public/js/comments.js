let createButton = document.getElementById('create-button');

let commentForm = document.getElementById('new-comment-form');

createButton.addEventListener('click', () => {
        commentForm.setAttribute('style', 'display: block');
        createButton.setAttribute('style', 'display: none')
});

const newPostHandler = async (event) => {
    event.preventDefault ();
    const content = document.querySelector('#content').value.trim();
  
    if (content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If response is ok , reload page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    };
};

document.querySelector('#submit-post').addEventListener('submit', newPostHandler);