const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const jobSchema =  new mongoose.Schema({
    title: {
        type : String,
        required: [true, 'Please enter Job tittle.'],
        trim: true,
        maxlength: [100, 'job title cannot exceed 100 characters']
    },
   
    slug :  String,
    description : {
        type : String,
        required : [true, 'please enter job description'],
        maxlength: [1000, 'job title cannot exceed 1000 characters']
    },

    email : {
        type : String,
        validate : [validator.isEmail, 'please add a valid email address'],
        
    },

    address : {
        type : String,
        required : [true, 'please enter address of company'],
       
    },

    company : {
        type : String,
        required : [true, 'please enter Name of company'],
       
    },

    industry : {
        type : [String],
        required : true,
        enum: {
            values: [
                'Business',
                "Information Technology",
                'Banking',
                'Education'
            ],
            message: 'please select correct options for industry'
        }
    },


    jobType : {
        type : String,
        required : true,
        enum: {
            values: [
                'Permanent',
                "Temporary",
                'Internship',
                'Contract'
            ],
            message: 'please select correct options for job type'
        }
    },

    salary: {
        type: Number,
        required: [true, 'please enter your salary expectation']
    },

    postingDate: {
        type : Date,
        default: Date.now
    },

    lastDate: {
        type : Date,
        default: new Date().setDate(new Date().getDate()+ 7)
    },

    applicantsApplied: {
        type: [],
        select : false
    }


});



//creating job slug before saving 
jobSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true});

    next();
});

module.exports = mongoose.model('job', jobSchema);