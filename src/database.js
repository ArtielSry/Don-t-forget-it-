const mongoose = require('mongoose');

//my MongoDB account
const URI = 'mongodb+srv://****:****************.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(URI)
.then(db => console.log('DB esta conectado'))
.catch( err => console.error(err))

module.exports = mongoose;
