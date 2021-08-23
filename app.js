// use inquirer
const inquirer = require("inquirer");
const db = require("./db/connection"); 

// ask user what they want to do 
const initiate = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "initiate",
            message: "What would you like to do?",
            // an array with options for user input -- ask what function the user would like to run
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
    // based on the choice, run the function to match
    .then((response) => {
        let choice = response.initiate;
        console.log(choice);
        
        if (choice === "view all departments") {
            console.log("you selected view all departments.");
            viewDepartments();
        } else if (choice === "view all roles") {
            console.log("you selected view all roles.");
            viewRoles();
        } else if (choice === "view all employees"){
            console.log("you selected view all employees.");
            viewEmployees();
        } else if (choice === "add a department") {
            addDepartment();
        }else if (choice === "add a role") {
            addRole();
        } else if (choice === "add an employee") {
            addEmployee();
        } else if (choice === "update an employee role") {
            updateEmployee();
        }
    });
}
            
initiate();

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    db.promise()
    .query(`SELECT departments.id, departments.department FROM departments;`)
    .then(([rows]) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => initiate());
}
            
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    db.promise()
    .query(`SELECT * FROM roles;`)
    .then(([rows]) => {
        let roles = rows;
        console.table(roles);
    })
    .then(() => initiate());
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
    db.promise()
    .query(`SELECT * FROM employees;`)
    .then(([rows]) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => initiate());
}
        
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
    // prompt user for department name
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What department would you like to add?"
        },
    ])
    .then((response) => {
        let { newDepartment } = response;
        db.promise().query(
            "INSERT INTO departments (department) VALUES (?)",
            [newDepartment],
            (err, result) => {
                if (err) throw err;
                return newDepartment;
            }
        );
    })
    .then(() => initiate());
    // query db with the insert
}

function getDepartment() {
    return db
    .promise()
    .query(`SELECT departments.id FROM departments;`)
}
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
async function addRole() {
    let selections = {}
    // get the avaiable department ids
    let departments = await getDepartment().then(([rows]) => {
        let departments = rows;
        let departmentChoices = departments.map(department => ({
            name: department.department,
            value: department.id
        }));
        selections.departmentChoices = departmentChoices
    })

    // prompt user for role name, salary, and department
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this new role?"
        },
        {
            type: "input",
            name: "department",
            message: "To which department does this role belong?"
        }
    ]).then(answers => {
        // we know everything--package it and do an insert query
        let dataToAdd = {
            title: answers.newRole,
            salary: answers.salary,
            department: answers.department_id,
        }; db
        .promise()
        .query(
            "INSERT INTO departments SET ?",
            dataToAdd,
            (err, result) => {
                if (err) throw err;
                return dataToAdd;
            }
        );
    }).then(()=> initiate())
}


function getRoles() {
    return db
    .promise()
    .query("SELECT roles.id FROM roles;")
}

function getManagers() {
    return db
    .promise()
    .query(`SELECT employees.id FROM employees;`)
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
async function addEmployee() {
    let choices = {}
    // get the avaiable role ids
    let roles = await getRoles().then(([rows]) => {
        let roles = rows;
        let roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        choices.roleChoices = roleChoices
    })

    let managers = await getManagers().then(([rows]) => {
        let managers = rows;
        let managerChoices = managers.map(manager => ({
            name: manager.last_name,
            value: manager.id
        }));
        choices.managerChoices = managerChoices
    })

    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What's the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What's the employee's last name?",
        },
        {
            type: "list",
            name: "roleID",
            message: "which role does the employee have?",
            choices: choices.roleChoices,
        },
        {
            type: "list",
            name: "managerID",
            message: "Who is the employee's manager?",
            choices: choices.managerChoices,
        },
    ]).then(answers => {
        // we know everything--package it and do an insert query
        let dataToInsert = {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleID,
            manager_id: answers.managerID
        }; db
        .promise()
        .query(
            "INSERT INTO employees SET ?",
            dataToInsert,
            (err, result) => {
                if (err) throw err;
                return dataToInsert;
            }
        );
    }).then(()=> initiate())
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database