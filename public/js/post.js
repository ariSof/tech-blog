const deletePostFormHandler = async (event) => {
    event.preventDefault();
    
    const theURL = new URL(window.location.href );
    let paramString = theURL.pathname.split('/');
    let post_id = paramString[2];
  
    const responseData = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res.json(); //resolves response promise
    });

    if (responseData) {
        //user_id = responseData.user_id;
    } else {
        // not found alert
        alert(responseData);
    }

  };
  

  const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const theURL = new URL(window.location.href );
    let paramString = theURL.pathname.split('/');
    let id = paramString[2];

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const date_created = new Date();
  
    const responseData = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, date_created }),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        return res.json(); //resolves response promise
    });

    if (responseData) {
        location.reload();
        //user_id = responseData.user_id;
    } else {
        // not found alert
        alert(responseData);
    }

  };

  document
    .querySelector('.update-post-form')
    .addEventListener('submit', deletePostFormHandler);

const updateBtnEl = document.querySelector('#update-post');
updateBtnEl.addEventListener('click', updatePostFormHandler);
  