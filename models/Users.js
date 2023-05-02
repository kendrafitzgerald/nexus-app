const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPassword) {
        return bcript.compare(loginPassword, this.password)
    }
};

User.init ({
    id: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        },
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    major: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clubs: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    graduation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }

},
{
    hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User