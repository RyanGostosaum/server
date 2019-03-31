const mongoose = require('mongoose');

const PostSchema = require('../models/posts');

const PostModel = mongoose.model('Post');

let PostController = {}

PostController.allUsers = (req, res) => {
    PostModel
        .find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

PostController.newPost = (req, res) => {

    if (req.body.content) {
        console.log(req.body);
    }
}

PostController.updatePost = (req, res) => {

    PostModel.findOneAndUpdate({
        _id: req.query._id
    }, {
        $set: {
            content: req.query.content
        }
    }, {new: true}).then((r) => {
        res.json({message: 'Update feito com sucesso', status: 201, res: r})
    }).catch(e => {
        console.log(e);
        res.json({message: 'Error', status: 405})
    })
}

PostController.deletePost = (req, res) => {

    PostModel.findByIdAndRemove(req.query._id, (err, user) => {
        if (err) {
            res.json({message: 'Error', status: 400})
        } else {

            res.json({message: 'Delete feito com sucesso', status: 201})
        }
    })
}

module.exports = PostController;