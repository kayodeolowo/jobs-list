const User = require ('../models/users');

//register new user api/v1/register



exports.registerUser = async (req, res, next)=> {
    const {email, password, role, name} = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(200).json({
            success: true,
            message: 'Account successfully created',
            data: user
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
