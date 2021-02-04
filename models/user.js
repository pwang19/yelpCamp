const mongoose = require("mongoose");
const passport = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Username cannot be left blank.'],
        unique: true
    }
})
userSchema.plugin(passport);

module.exports = mongoose.model("User", userSchema);