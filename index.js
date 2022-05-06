const mysql = require("mysql");
const cTable = require('console.table');
const inquirer = require ('inquirer'); 

const connection = mysql.createConnection(
    { host: "localhost",
      port: 3306,
      user: "root",
      password: "TheLastJedi",
      database: "employee_track_db"
  });