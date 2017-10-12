const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    display: String,
    topWave: Number,
    game: {
        towers: [Number],
        mercs: Number,
        wave: Number,
        lvl: Number,
        XP: Number,
        weapons: [Number],
        money: Number
    }
});


const Users = mongoose.model('Users', UserSchema);

module.exports = Users;