const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');
const path = require('path');
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs
  .readdirSync(__dirname) // �쁽�옱 �뤃�뜑�쓽 紐⑤뱺 �뙆�씪�쓣 議고쉶
  .filter(file => { // �닲源� �뙆�씪, index.js, js �솗�옣�옄媛� �븘�땶 �뙆�씪 �븘�꽣留�
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // �빐�떦 �뙆�씪�쓽 紐⑤뜽 遺덈윭����꽌 init
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach(modelName => { // associate �샇異�
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
