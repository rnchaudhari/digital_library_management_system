const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}