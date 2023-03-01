const mongoose = require('mongoose');

const URI = 'mongodb+srv://crudMe:crud1234567890@crud.wi8qxce.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(URI)
.then(db => console.log('DB esta conectado'))
.catch( err => console.error(err))

module.exports = mongoose;