//Get all jobs (/api/v1/jobs)

exports.getJobs = (req, res, next )=>{
    res.status(200).json({
        success : true,
        message: 'this route will display obs fr new data base'
    })
}