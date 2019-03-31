const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    likes: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);