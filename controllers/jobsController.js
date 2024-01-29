const Job = require('../models/jobs')

//Get all jobs (/api/v1/jobs)

exports.getJobs = async (req, res, next) => {

    const jobs = await Job.find()

    res.status(200).json({
        success: true,
        results: jobs.length,
        data : jobs
    })
}

//create a new job => /api/v1/job/new

exports.newJob = async (req, res, next) => {
    //console.log(req.body)
    const job = await Job.create(req.body);

    res.status(200).json({
        success: true,
        message: 'job created',
        data: job
    })
}


//update a job = /api/v1/job/:id

exports.updateJob = async (req, res, next) =>{
    let job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
            success: false,
            message: 'job not found'
        })
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'job is updated',
        data: job
    })
}