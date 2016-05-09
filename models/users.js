var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataType){

    var Users = sequelize.define("Users", {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        email: {
            type: DataType.STRING,
            unique: true,            
            allowNull: false,
            validate: { notEmpty: true }
        },
            password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }

    }, {
        hooks: {
            beforeCreate: function(user){
                var salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
    // }, {
        classMethods: {
            associate: function(models){
                Users.hasMany(models.Tasks);
            }
            , isPassword: function(encodedPassword, password){
                return bcrypt.compareSync(password, encodedPassword);
            }
        }
    });

    return Users;
};