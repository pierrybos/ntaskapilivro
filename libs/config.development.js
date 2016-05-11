module.exports = {
    database: "ntask"
    , username: ""
    , password: ""
    , params: {
        dialect: "sqlite"
        , storage: "ntask.sqlite"
        , logging: function(sql){
            logger.info("[" + (new Date()) + "]" + sql);
        }
        , define: {
            unserscored: true
        }
    }
    , jwtSecret: "Nta$k-AP1"
    , jwtSession: { session: false }
};