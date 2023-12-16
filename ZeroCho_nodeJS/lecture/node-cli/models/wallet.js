const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('wallet', {
        money: {
            type: Sequelize.INTEGER,
            alloNull: false,
            comment: "cash",
        },
        desc: {
            type: Sequelize.STRING(100),
            alloNull: false,
            comment: "explain",
        },
        type: {
            type: Sequelize.BOOLEAN,
            alloNull: false,
            comment: "True -> profit / cost -> false",
        },
    }, {
        timestamps: true,
    })
};