let createButton = document.getElementById('create-button');

let commentForm = document.getElementById('new-comments-form');

createButton.addEventListener('click', () => {
        commentForm.setAttribute('style', 'display: block');
        createButton.setAttribute('style', 'display: none')
});

const newCommentsHandler = async (event) => {
    event.preventDefault ();
    const content = document.querySelector('#content').value.trim();
    const id = window.location.toString().split("/")[window.location.toString().split("/").length-1]
  
    if (content) {
      const response = await fetch(`/api/comments/${id}`, {
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

document.querySelector('#submit-comments').addEventListener('submit', newCommentsHandler);