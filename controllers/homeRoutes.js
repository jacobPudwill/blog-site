const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User, 
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User, 
                            attributes: ['username']
                        }
                    ]
                }
            ]
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        layout: 'alt',
        posts,
        logged_in: req.session.logged_in
    });
});

router.get('/dashboard/new-post', withAuth, async (req, res) => {
    res.render('newPost', {
        layout: 'alt',
        logged_in: req.session.logged_in
    });
});

router.get('/dashboard/edit-post/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    });

    const post = postData.get({ plain: true });

    res.render('editPost', {
        layout: 'alt',
        post,
        logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;
