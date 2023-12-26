const mongoose = require('mongoose');

main().catch(err => console.log(err.name));

//Connecting To Database and /contacts_list_db :- Is the name of the database
async function main(){
    await mongoose.connect('mongodb://localhost/contacts_list_db');
    console.log("Successfully Connected To Database");
};


