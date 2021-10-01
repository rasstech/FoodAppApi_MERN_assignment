const mongoose = require('mongoose');

// creating database
mongoose.connect("mongodb://localhost:27017/FoodDb",
{
   useCreateIndex:true,
   useNewUrlParser:true,
   useUnifiedTopology:true
}).then(() => {
       console.log('Database connected');
}).catch((err) => {
   console.log("unable to connect")
});
module.exports = mongoose;
