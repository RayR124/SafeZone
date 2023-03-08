const Feedback = require('../models/Feedback');


addFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json({
            success: true,
            data: feedback
        });
    } catch (err) {
        
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}


module.exports = {addFeedback};