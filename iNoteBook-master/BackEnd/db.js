const mogoose = require("mongoose");

const mongoURI = 'mongodb://localhost:27017/iNotebook'

const connectToMongo = () => {
    mogoose.connect(mongoURI)
}

module.exports = connectToMongo;