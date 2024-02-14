// errors.js

const handleErrors = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({
            success: false,
            error: 'DuplicateEmail',
            message: 'Email already exists'
        });
    }

    res.status(500).json({
        success: false,
        error: 'InternalServerError',
        message: 'Internal server error'
    });
};

module.exports = handleErrors;
