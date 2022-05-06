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

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start(); 
  });
  
  function start(){
    inquirer
    .prompt ([
      {
        type: "list", 
        message: "What would you like to do?",
        name: "start",
        choices: [
        "Add Employee", 
        "View all employee", 
        "Remove Employee",
        "Add Department", 
        "View all department",
        "Add role", 
        "View all role", 
        "Update Employee Role", 
        "Exit"
      ]
      }
    ])
    .then (function(res){
      switch (res.start){
  
        case "Add Employee":
        addEmployee();
        break;
       
        case "View all employee":
        viewAllemployee();
        break; 
  
        case "Remove Employee": 
        removeEmployee(); 
        break;
      
        case "Add Department": 
        addDept(); 
        break;
  
        case "View all department":
        viewAllDept();
        break;
  
        case "Add role": 
        addRole(); 
        break;
  
        case "View all role": 
        viewAllrole(); 
        break;
      
        case "Update Employee Role":
        updateEmployeeRole(); 
        break;
  
        case "Exit":
        connection.end(); 
        break; 
      }
    })
  }

  function addEmployee() {
    console.log("Inserting a new employee.");
    inquirer 
      .prompt ([ 
        {
          type: "input", 
          message: "First Name?",
          name: "first_name",
        },
        {
          type: "input", 
          message: "Last Name?",
          name: "last_name"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role_id", 
          choices: [1,2,3]
        },
        {
          type: "input", 
          message: "Who is their manager?",
          name: "manager_id"
        }
      ])
      .then (function(res){
        const query = connection.query(
          "INSERT INTO employee SET ?", 
         res,
          function(err, res) {
            if (err) throw err;
            console.log( "Employee added");
    
            start (); 
          }
        );    
      })
    }