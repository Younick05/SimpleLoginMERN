const mongoose = require ("mongoose");

const dbUrl = "mongodb+srv://user:8819959982@cluster0.flffo.mongodb.net/user?retryWrites=true&w=majority";

const db = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    console.log("mongoose connected")
}

db();