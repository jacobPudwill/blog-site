const editPostFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#edit-post-btn').getAttribute('data-id');
    const title = document.querySelector('#edit-post-title').value;
    const content = document.querySelector('#edit-post-content').value.trim();

    if (id && title && content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
}

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostFormHandler);

document
    .querySelector('#delete-btn')
    .addEventListener('click', delButtonHandler);
