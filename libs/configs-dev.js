module.exports = {
    database: "ntask"
    , username: ""
    , password: ""
    , params: {
        dialect: "sqlite"
        , storage: "ntask.sqlite"
//        , logging: false
        , define: {
            unserscored: true
        }
    }
    , jwtSecret: "Nta$k-AP1"
    , jwtSession: { session: false }
};