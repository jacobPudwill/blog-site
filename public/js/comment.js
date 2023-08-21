const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#submit-comment').getAttribute('data-id');
    const content = document.querySelector('#new-comment-content').value.trim();

    console.log(post_id, content);

    if (post_id && content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('#new-comment')
    .addEventListener('submit', newCommentFormHandler);
