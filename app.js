// use inquirer
const inquirer = require("inquirer");
const db = require("./db/connection"); // my reference does a little different here

// ask user what they want to do -- modify employees, modify roles. or modify departments
// an array of questions for user input
const initiate = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initiate",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((response) => {
      let choice = response.initiate;
      console.log(choice);

      if (choice === "view all departments") {
        console.log("you chose view all departments");
        viewDepartments();
      } else if (choice === "view all roles") {
        console.log("you selected view all roles.");
        viewRoles();
      } else if (choice === "add a department") {
        addDepartment();
      } else if (choice === "add an employee") {
        addEmployee();
      }
    });
};

initiate();

function viewDepartments() {
  db.promise()
    .query(`select departments.id, departments.department  from departments;`)
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => initiate());
}

function viewRoles() {
  db.promise()
    .query(`select * from roles;`)
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => initiate());
}

function addDepartment() {
  // prompt user for department name
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      let { newDepartment } = response;
      // console.log(newDepartment)
      db.promise().query(
        "INSERT INTO departments (department) VALUES (?)",
        [newDepartment],
        (err, result) => {
          if (err) throw err;
          // console.log('you have added ' + newDepartment + " successfully");
          return newDepartment;
        }
      );
    })
    .then(() => initiate());
  // query db with the insert
}
function getRoles() {
    return db.promise().query("select roles.id from roles;")
}
function getManagers() {
    return  db
    .promise()
    .query(`select employees.id from employees;`)
}
async function addEmployee() {
    let choices = {}
  // get the avaiable role ids
//   let [roles] = await getRoles();
let roles =await getRoles().then(([rows]) => {
    let roles = rows;
    let roleChoices = roles.map(role=>({
        name: role.id,
        value: role.id
    }));
    choices.roleChoices = roleChoices

})
//   db
//     .promise()
//     .query(`select roles.id from roles;`)
//     .then(([rows]) => {
//       let roleIDs = rows;
//       return roleIDs;
//     });
    // console.log(roles)

  // get the available manager ids
//   let [managers] = await getManagers();
// let managers = await getManagers().then(([rows])=> {
//     let managers = rows;
//     return managers;
// })
let managers =await getManagers().then(([rows]) => {
    let managers = rows;
    let managerChoices = managers.map(manager=>({
        name: manager.id,
        value: manager.id
    }));
    choices.managerChoices = managerChoices

})
//   db
//     .promise()
//     .query(`select employees.id from employees;`)
//     .then(([rows]) => {
//       let employeeIDs = rows;
//       return employeeIDs;
//     });
    // console.log(managers)
  //prompt user for first name, last name, role id and manager id
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "last name?",
    },
    {
      type: "list",
      name: "roleID",
      message: "which role id is it?",
      choices: choices.roleChoices,
    },
    {
      type: "list",
      name: "managerID",
      message: "Whos their manager?",
      choices: choices.managerChoices,
    },
  ]).then(answers => {
      // we know everything--package it and do an insert query
      let dataToInsert = {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleID,
          manager_id: answers.managerID
      };
      db.promise().query(
        "INSERT INTO employees SET ?",
        dataToInsert,
        (err, result) => {
          if (err) throw err;
          return dataToInsert;
        }
      );

  }).then(()=> initiate())
}

// based on their answer do the thing
// you chose to work with employees. heres a list of alll the employees. what would u l;ike to do? add delete?

// view/add/delete employees

//once we get it working with employees, we can do these other ones
// view/add/delete roles

// view/add/delete departments

// const promptDepartments = () => {
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         },
//         {
//             type:
//             name:
//             message:
//         }
//     ])
// };

// const promptRoles = () => {
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         },
//         {
//             type:
//             name:
//             message:
//         }
//     ])
// };

// const promptEmployees = () => {
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         },
//         {
//             type:
//             name:
//             message:
//         }
//     ])
// };

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
// Mock-Up
