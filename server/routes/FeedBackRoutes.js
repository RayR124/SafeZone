const express = require('express');
const router = express.Router();
const {addFeedback} = require('../controller/FeedbackController');

// @desc    Create a new feedback
// @route   POST /api/feedback
// @access  Private

router.post('/', FeedbackController.addFeedback);

module.exports = router;