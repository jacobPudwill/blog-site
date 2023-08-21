module.exports = {
    format_date: (date) => {
        const month = '' + (date.getMonth() + 1);
        const day = '' + date.getDate();
        const year = '' + date.getFullYear();

        return [month, day, year].join('/');
    },

    noComments: (comments) => {
        if (comments.length === 0) {
            return true;
        }
        return false;
    },

    newComment: (logged_in, post_user_id, user_id) => {
        if (logged_in && post_user_id != user_id) {
            return true;
        }
        return false;
    }
};