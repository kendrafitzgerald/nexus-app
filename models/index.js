const User = require('./Users');
const BlogPost = require('./blogPosts');
const Comments = require('./comments');

User.hasMany(BlogPost, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE',
});

 User.hasMany(Comments, {
    foreignkey: 'user_id'
});

BlogPost.belongsTo(User, {
    foreignkey: 'user_id'
})

 BlogPost.hasMany(Comments, {
     foreignkey: 'post_id'
 });

Comments.belongsTo(BlogPost,{
    foreignkey: 'post_id'
})

Comments.belongsTo(User,{
    foreignkey: 'user_id'
});

module.exports = {User, BlogPost, Comments}