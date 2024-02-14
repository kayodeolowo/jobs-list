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
        
        // create jwt token
        const token = user.getJwtToken();

        // data: user,

        res.status(200).json({
            success: true,
            message: 'Account successfully created',      
            token
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


//login user= api/v1/login

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    //checks if email or password is entered by user
    if (!email || !password) {
        const error = new Error('Please enter both email and password.');
        error.status = 400; // Set custom status code (e.g., Bad Request)
        return res.status(400).json({ success: false, message: error.message });
    }

    try {
        // Finding user in database
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401; // Unauthorized
            return res.status(401).json({ success: false, message: error.message });
        }

        // Check if password is correct 
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            const error = new Error('Invalid email or password');
            error.status = 401; // Unauthorized
            return res.status(401).json({ success: false, message: error.message });
        }
        
        // Create JSON web token
        const token = user.getJwtToken();

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


