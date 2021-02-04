if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthorOfCampground, validateCampground, wrapAsync } = require('../utils/middleware');
const campground = require('../controllers/campgrounds');
const multer = require('multer')
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(campground.renderMainPage))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campground.createCampground));

router.get('/new', isLoggedIn, campground.renderCreatePage);

router.route('/:id')
    .get(wrapAsync(campground.renderDetailsPage))
    .put(isLoggedIn, isAuthorOfCampground, upload.array('image'), validateCampground, wrapAsync(campground.editCampground))
    .delete(isLoggedIn, isAuthorOfCampground, wrapAsync(campground.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthorOfCampground, wrapAsync(campground.renderEditPage));

module.exports = router;