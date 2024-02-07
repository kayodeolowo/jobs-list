const express = require('express');
const router = express.Router();

//importing jobs controller methods

const {
getJobs,
newJob,
updateJob,
deleteJob,
getJob
} = require('../controllers/jobsController');

router.route('/jobs').get(getJobs);
router.route('/jobs/:id/:slug').get(getJob);
router.route('/jobs/new').post(newJob);
router.route('/job/:id').put(updateJob);
router.route('/job/:id').put(updateJob).delete(deleteJob)



module.exports = router;