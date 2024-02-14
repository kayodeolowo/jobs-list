const express = require ('express')
const app = express();
const dotenv= require('dotenv')
const handleErrors = require('./middlewares/errors');

const connectDatabase = require('./config/database');

//setting up config.env file variables
dotenv.config({path: './config/config.env'})

//connect to database
connectDatabase();

//setup body parser
app.use(express.json());

// Error handling middleware
app.use(handleErrors);
    



//importing all the routes
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');

app.use('/api/v1', jobs)
app.use('/api/v1', auth)

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server starter on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);

}); 
