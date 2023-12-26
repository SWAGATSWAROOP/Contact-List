const mongoose = require('mongoose');

//Giving the Schema to DB
const contactSchema = mongoose.Schema(
    {
      name: {
        type : String,
        required : true
      },
      phone : {
        type : Number,
        required : true
      }
    }
);

//Creating A model of the Databse.
const Contact = mongoose.model('Contact',contactSchema);

//Exporting the module
module.exports = Contact;