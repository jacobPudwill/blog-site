const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

class User extends Model {}

module.exports = User;
