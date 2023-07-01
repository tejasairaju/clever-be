const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("testdb", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

const Contact = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    salutation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone_numbers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Contact = Contact;

module.exports = db;
