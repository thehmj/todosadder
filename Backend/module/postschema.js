const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const postschema = new moongose.Schema({
    item: {
        type: String,
        required: true
    },
    order:{
        type: Number,
        required: true
    },
    check:{
        type: Boolean,
        default: false
    }

})

const Posts = new moongose.model("POST", postschema);
module.exports =  Posts;