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

const {isAuthenticatedUser} = require('../middlewares/auth')

router.route('/jobs').get(getJobs);
router.route('/jobs/:id/:slug').get(getJob);
router.route('/jobs/new').post(isAuthenticatedUser, newJob);
router.route('/job/:id').put(isAuthenticatedUser, updateJob);
router.route('/job/:id').put(isAuthenticatedUser, updateJob).delete(deleteJob)
router.route('/stats/:topic').get(jobStats);



module.exports = router;