const express = require('express');
const router = express.Router();
const adjustmentController = require('../controllers/adjustmentController');

router.get('/', adjustmentController.getAllAdjustments);
router.post('/', adjustmentController.createAdjustment);

module.exports = router;