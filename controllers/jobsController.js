const Job = require('../models/jobs')

//Get all jobs (/api/v1/jobs)

exports.getJobs = (req, res, next )=>{
    res.status(200).json({
        success : true,
        requestMethod: req.requestMethod,
        message: 'this route will display obs fr new data base'
    })
}

//create a new job => /api/v1/job/new

exports.newJob = async (req, res, next)=>{
    //console.log(req.body)
   const job = await Job.create(req.body);
   
   res.status(200).json({
    success : true,
    message: 'job created',
    data: job
   })
}