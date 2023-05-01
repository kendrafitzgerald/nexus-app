const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class blogPosts extends Model { }

blogPosts.init(
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
                model: 'user',
                key: 'major', // is this correct? am I reading the diagram in googledoc correctly? 
            },
        },
        created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogPosts',
    },
);

module.exports = blogPosts;
