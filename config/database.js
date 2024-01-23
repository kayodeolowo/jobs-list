const mongoose = require('mongoose')


const connectDatabase = ()=> { mongoose.connect(process.env.DB_LOCAL_URI, {
     useNewUrlParser: true, // No longer necessary, but won't cause harm
     useUnifiedTopology: true,
      //useCreateIndex: true, // This option is not necessary
    // useFindAndModify: false,
}).then(con => {
    console.log(`MongoDB Database with host: ${con.connection.host}
    `);
});
};


module.exports = connectDatabase;