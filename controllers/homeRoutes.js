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

router.get('/dashboard/new-post', withAuth, async (req,res) => {
    res.render('newPost', {
        layout: 'alt',
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
