const searchData = async () => {
    let text = document.querySelector('#text').value.trim();
    console.log(text);

    const theURL = new URL(window.location.href );
    let paramString = theURL.pathname.split('/');
    let post_id = paramString[2];

    // if there is an input
    if (text) {
        // Send a POST request to the search API endpoint
        console.log("Before we call post on comment...");
        console.log(post_id);
        let user_id;
        const responseData = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ text, post_id}),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            return res.json(); //resolves response promise
        });

        if (responseData) {
            console.log("In public js got response for page")
            console.log(responseData);
            location.reload();
            //user_id = responseData.user_id;
        } else {
            // not found alert
            alert(responseData);
        }

    }
};

 document.querySelector('.comment').addEventListener('click', searchData);