const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

/* 
modelimizi oluştururken Post isminde string bir değer yazdık,
mongoose bunu bizim adımıza küçük harfle çoğulunu alıp(posts) collection oluşturacak
*/
const Post = mongoose.model('Post',PostSchema);

module.exports = Post;