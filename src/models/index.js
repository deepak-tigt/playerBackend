
// import fs from "fs"
// import path from "path"
// import { Sequelize } from "sequelize";
// import process from "process";
// import { config } from "../config/config.js";

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';

// // const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db

// -----------according to the ES6-----------------------

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config.js";
import { fileURLToPath,pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];


const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file !== "index.js" &&
      file.endsWith(".js")
  );

for (const file of files) {
  const fileUrl = pathToFileURL(path.join(__dirname, file)).href;

  const { default: modelDef } = await import(fileUrl);
  const model = modelDef(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
