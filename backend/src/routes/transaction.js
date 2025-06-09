const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/import', controller.importTransactions);
router.get('/filter', controller.getFilteredAndSorted);

module.exports = router;