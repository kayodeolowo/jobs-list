// filterUtils.js

const filterJobs = (query) => {
    let filter = {};

    // Example: filter by job title
    if (query.title) {
        filter.title = { $regex: query.title, $options: 'i' }; // Case-insensitive regex search
    }

    // Filter by job type
    if (query.jobType) {
        filter.jobType = query.jobType;
    }

    // Add more filters as needed

    return filter;
};


const paginateJobs = (query) => {
    const page = parseInt(query.page) || 1;
    limit = parseInt(query.limit) || 10; // Default limit to 10 documents per page
    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    };
};

module.exports = { filterJobs, paginateJobs };