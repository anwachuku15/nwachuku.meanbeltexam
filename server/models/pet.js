const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name must be at least 3 characters'],
    },
    type : {
        type: String,
        required: [true, 'Type must be at least 3 characters']
    },
    description : {
        type: String,
        required: [true, 'Description must be at least 3 characters']
    },
    skill1 : {
        type: String,
        required: [false, '']
    },
    skill2 : {
        type: String,
        required: [false, '']
    },
    skill3 : {
        type: String,
        required: [false, '']
    },
    likes : {
        type: Number,
        required: [false, '']
    }
}, {timestamps: true});

mongoose.model('Pet', PetSchema);