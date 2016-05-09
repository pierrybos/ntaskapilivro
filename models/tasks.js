module.exports = function(sequelize, DataType){
    
    var Tasks = sequelize.define("Tasks", {
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models){
                Tasks.belongsTo(models.Users);
            }
        }
    });

    return Tasks;
    // return {
    //     findAll: function(params, callback){
    //         return callback([
    //             {title:'comprar'},
    //             {title:'estudar'}
    //             ]);
    //     }
    // }
};