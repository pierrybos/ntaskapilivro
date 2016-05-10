module.exports = function(app){
    var env = process.env.NODE_ENV

    if(Boolean(env)){
        return require('./config.' + env + '.js');
    }
    return require('./config.development.js');
};