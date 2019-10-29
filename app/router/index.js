const router = require('express').Router();

router.use('/persons', require('../Persons'));
router.use('/regions', require('../Region'));
router.use('/metric', require('../Metric'));

module.exports = router;
