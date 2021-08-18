const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ProjectSchema = new Schema({
    list: {
        type: [Number],
    }
})

//create model for todo
const projectModel = mongoose.model('list', ProjectSchema);

module.exports = projectModel;