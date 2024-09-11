const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//gets the user as well as the application schema within the user
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

//renders the new page
router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});

//posts the form from the new page
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

//gets the application from its ID
router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

//deletes the application from the user's profile
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

//get the applicaton and edits the specific application
router.get('/:applicationId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

router.put('/:applicationId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const application = currentUser.applications.id(req.params.applicationId);
      application.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/applications/${req.params.applicationId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });

module.exports = router;