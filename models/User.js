const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    session: false
});

module.exports = mongoose.model('User', userSchema);