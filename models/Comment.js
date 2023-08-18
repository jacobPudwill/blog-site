const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

class Comment extends Model {}

module.exports = Comment;
