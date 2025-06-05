const express = require('express');
const router = express.Router();
const controller = require('../controllers/equityController');

router.get('/', controller.getAllEquities);
router.post('/', controller.createEquity);
router.put('/:id', controller.updateEquity);
router.delete('/:id', controller.deleteEquity);

module.exports = router;