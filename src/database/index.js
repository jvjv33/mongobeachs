const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost/beachs', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    mongoose.Promise = global.Promise;
} catch (error) {
    console.log('Error when try connect database!');
}

module.exports = mongoose;