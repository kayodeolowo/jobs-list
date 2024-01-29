const express = require('express');
const router = express.Router();

//importing jobs controller methods

const {
getJobs,
newJob,
updateJob
} = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);

router.route('/jobs/new').post(newJob);
router.route('/job/:id').put(updateJob);



module.exports = router;