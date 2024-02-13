const express = require('express');
const router = express.Router();

//importing jobs controller methods

const {
getJobs,
newJob,
updateJob,
deleteJob,
getJob,
jobStats
} = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/jobs/:id/:slug').get(getJob);
router.route('/jobs/new').post(newJob);
router.route('/job/:id').put(updateJob);
router.route('/job/:id').put(updateJob).delete(deleteJob)
router.route('/stats/:topic').get(jobStats);



module.exports = router;