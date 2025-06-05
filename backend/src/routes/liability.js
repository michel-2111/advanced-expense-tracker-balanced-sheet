const express = require('express');
const router = express.Router();
const controller = require('../controllers/liabilityController');

router.get('/', controller.getAllLiabilities);
router.post('/', controller.createLiability);
router.put('/:id', controller.updateLiability);
router.delete('/:id', controller.deleteLiability);

module.exports = router;