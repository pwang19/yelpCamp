const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, wrapAsync, isAuthorOfReview } = require('../utils/middleware');
const review = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, wrapAsync(review.createReview));
router.delete('/:reviewId', isLoggedIn, isAuthorOfReview, wrapAsync(review.deleteReview));

module.exports = router;