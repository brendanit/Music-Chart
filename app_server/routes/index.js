const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid');
//router.get('/location', ctrlLocations.locationInfo);
//router.get('/location/review/new', ctrlLocations.addReview);
router.get('/register', ctrlLocations.register);
router.get('/login', ctrlLocations.login);
router
.route('/location/:locationid/review/new')
.get(ctrlLocations.addReview)
.post(ctrlLocations.doAddReview);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
