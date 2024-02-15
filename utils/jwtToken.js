//create and send token and save in cookie
const sendToken = (user, statusCode, res, req) => {
    //create jwt token
    const token = user.getJwtToken();

    //option for cookie
    const options = {
        //  expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), // Expires in 7 days
        httpOnly: true
    };

        if(process.env.NODE_ENV === 'production'){
            options.secure = true;
        }
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}

module.exports = sendToken;