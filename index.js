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

    function viewAllemployee() {

        connection.query("SELECT employee.first_name, employee.last_name, role.title AS \"role\", managers.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee managers ON employee.manager_id = managers.id GROUP BY employee.id",  
        function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      }
      
      function removeEmployee(){
        let employeeList = [];
        connection.query(
          "SELECT employee.first_name, employee.last_name FROM employee", (err,res) => {
            for (let i = 0; i < res.length; i++){
              employeeList.push(res[i].first_name + " " + res[i].last_name);
            }
        inquirer 
        .prompt ([ 
          {
            type: "list", 
            message: "Which employee would you like to delete?",
            name: "employee",
            choices: employeeList
      
          },
        ])
        .then (function(res){
          const query = connection.query(
            `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
              function(err, res) {
              if (err) throw err;
              console.log( "Employee deleted!\n");
           start();
          });
          });
          }
            );
            };

            function addDept(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "deptName", 
      message: "What Department would you like to add?"
    }
  ])
  .then(function(res){
    console.log(res);
    const query = connection.query(
      "INSERT INTO department SET ?", 
      {
        name: res.deptName
      }, 
      function(err, res){
        connection.query("SELECT * FROM department", function(err, res){
          console.table(res); 
          start(); 
        })
      }
    )
  })
}

function addDept(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "deptName", 
        message: "What Department would you like to add?"
      }
    ])
    .then(function(res){
      console.log(res);
      const query = connection.query(
        "INSERT INTO department SET ?", 
        {
          name: res.deptName
        }, 
        function(err, res){
          connection.query("SELECT * FROM department", function(err, res){
            console.table(res); 
            start(); 
          })
        }
      )
    })
  }

