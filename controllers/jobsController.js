const Job = require('../models/jobs')
const { filterJobs, paginateJobs } = require('../utils/apiFilters')

//Get all jobs (/api/v1/jobs)

exports.getJobs = async (req, res, next) => {
    try {
        let jobs;
        const filter = filterJobs(req.query);

        if (req.query.limit && req.query.page) {
            // Pagination is requested
            const { skip, limit } = paginateJobs(req.query);
            jobs = await Job.find(filter).skip(skip).limit(limit);
        } else {
            // No pagination requested, return all jobs
            jobs = await Job.find(filter);
        }


        res.status(200).json({
            success: true,
            results: jobs.length,
            data: jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
//get a single job with id and slug /api/v1/job/:id/:slug
exports.getJob = async( req, res, next)=> {
    const job = await Job.find({$and: [{_id : req.params.id}, {slug: req.params.slug}]});

    if(!job || job.length ===0 ){
        return res.status(404).json({
            success: false,
            message: 'job not found'
        })
    }


    res.status(200).json({
        success: true,
        data: job
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

exports.updateJob = async (req, res, next) => {
    try {
        let job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            message: 'Job is updated',
            data: job
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

//delete a job = /api/v1/job/:id

exports.deleteJob = async (req, res, next )=> {
    let job = await Job.findById(req.params.id);


    if(!job){
        return res.status(404).json({
            success: false,
            message: 'job not found'
        })
    }

    job = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success : true,
        message: 'job is deleted'
    })

}


//get stats about a job  = /api/v1/stats/:topic
exports.jobStats = async (req, res, next) => {
    const stats = await Job.aggregate([
        {
            
            $match: { $text: { $search: req.params.topic } }
        },

        {
            $group:{
                 _id: {},
                totalJobs: {$sum: 1},
                avgSalary: {$avg: '$salary' },
                minSalary: {$min: '$salary'},
                maxSalary: {$max: '$salary'}
            }
        }
    ])

    if(stats.length ===0 ){
        return res.status(200).json({
            success: false,
            message: `no stats found for - ${req.params.topic}`
        })
    }

    res.status(200).json({
        success: true,
        data: stats
    });
}