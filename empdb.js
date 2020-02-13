
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const chalk = require('chalk');
const options = require('./assets/options');
var queries = require('./assets/queries');

//Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sqlpass",
  database: "emp_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  startDB();
});

// function which initiates the actions within the employee tracker
startDB = () => {
  inquirer
    .prompt({
      name: "dbList",
      type: "list",
      message: "Please choose an action to get started:",
      choices: options
    })
    .then(function (dbChoice) {
      //Perform action based on user choice
      dbAction(dbChoice);
    });
}

// Using a function to store the if/else statement for the user choice
dbAction = (choice) => {
  if (choice.dbList === 'View all departments') {
    viewAllDepartments();
  }
  else if (choice.dbList === 'View all roles') {
    viewAllRoles();
  }
  else if (choice.dbList === 'View all employees') {
    viewAllEmployees();
  }
  else if (choice.dbList === 'Add a department') {
    addDepartment();
  }
  else if (choice.dbList === 'Add a role') {
    addRole();
  }
  else if (choice.dbList === 'Add a employee') {
    addEmployee();
  }
  else if (choice.dbList === 'Update an employee role') {
    console.log('Update Role');
    startDB()
  }
  else if (choice.dbList === `I'm done`) {
    console.log(chalk.bgRed('Finish!'));
    connection.end();
  }
}

// Function to view all of the departments
viewAllDepartments = () => {
  connection.query(queries.selectAllDepts(), function (err, results) {
    if(results.length > 0){
    if (err) throw err;
    console.log(chalk.blue(cTable.getTable('Departments View', results)));
    console.log('-----------------------------');
    }
    else{
      console.log(chalk.redBright('There are no departments in the database. Please add a department.'))
    }
    startDB();
  })
}

// Function to view all of the roles
viewAllRoles = () => {
  connection.query(queries.selectAllRoles(), function (err, results) {
    if(results.length > 0){
    if (err) throw err;
    console.log(chalk.green(cTable.getTable('Roles View', results)));
    console.log('-----------------------------');
    }
    else{
      console.log(chalk.redBright('There are no roles in the database. Please add a role.'))
    }
    startDB();
  })
}

// Function to view all employees
viewAllEmployees = () => {
  connection.query(queries.selectAllEmployees(), function (err, results) {
    if(results.length > 0){
      if (err) throw err;
    console.log(chalk.yellowBright(cTable.getTable('Employees View', results)));
    console.log('-----------------------------');
    }
    else{
      console.log(chalk.redBright('There are no employees in the database. Please add an employee.'))
    }
    
    startDB();
  })
}

// Function to add a department
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "What is the Department name you would like to add?"
      }
    ])
    .then(function (answer) {
      connection.query(
        queries.insertDepartment(answer.dept),
        function (err) {
          if (err) throw err;
          console.log(chalk.greenBright(`${answer.dept} department added successfully!`));
          console.log('-----------------------------');
          startDB();
        }
      );
    });
}

// Function to add a role
addRole = () => {
  // query the database for all departments
  connection.query(queries.selectAllDepts(), function (err, results) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of the role:"
        },
        {
          name: "salary",
          type: "input",
          message: "Enter the salary of the role:",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log(chalk.magentaBright(' Please enter a number.'))
            return false;
          }
        },
        {
          name: "department",
          type: "list",
          message: "Please choose a department for the role:",
          choices: function () {
            var deptArray = [];
            for (var i = 0; i < results.length; i++) {
              deptArray.push(results[i].name);
            }
            return deptArray;
          }
        }
      ])
      .then(function (answer) {
        connection.query(
          queries.insertRole(answer.title, answer.salary, answer.department),
          function (err) {
            if (err) throw err;
            console.log(chalk.greenBright(`${answer.title} role added successfully!`));
            console.log('-----------------------------');
            startDB();
          }
        );
      });
  });
}

//Function to add employee
addEmployee = () => {
  // query the database for all roles
  connection.query(queries.selectAllRoles(), function (err, results) {
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role",
          choices: function () {
            var rolesArray = [];
            for (var i = 0; i < results.length; i++) {
              rolesArray.push(results[i].title);
            }
            return rolesArray;
          }
        }
      ])
      .then(function (answer) {
        connection.query(
          queries.insertEmployee(answer.firstName, answer.lastName, answer.role),
          function (err) {
            if (err) throw err;
            console.log(chalk.greenBright(`Employee ${answer.firstName} ${answer.lastName} added successfully!`));
            console.log('-----------------------------');
            startDB();
          }
        );
      });
  });
}