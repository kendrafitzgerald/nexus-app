const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPosts extends Model { }

BlogPosts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        spotify: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'comments',
                key: 'id',
            },
        },
    },
   {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogPosts',

    },
);

module.exports = BlogPosts;
