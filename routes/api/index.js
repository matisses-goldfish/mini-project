const router = require('express').Router();
const travellerRoutes = require('./travellerRoutes');

router.use('/traveller', travellerRoutes);

module.exports = router;
