const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const {User, BlogPost, Comments} = require('../models');

router.get('/', async(req, res) => {
    try{
        //Get all post data with username
        const postData = await BlogPost.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }]
        })
        //Serialize post data so that the template can read it 
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch(error) {
        console.log("error")
        res.status(500).json(error)
    }
});

// Get Single posts with id
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comments,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });
        //render on the posts page
        const post = postData.get({plain:true});
        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn,
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// accessing users profile with their blog-posts
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userID, {
            include: [{model: BlogPost}],
        });
        const user = userData.get({plain: true});
        console.log(user)
        res.render('profile', {
            ...user, 
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//after user login, it will redirect to profile
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/profile');
        return;
    } 
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/profile');
        return;
    } 
    res.render('signup');
});


module.exports = router