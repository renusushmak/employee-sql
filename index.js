
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: 'rootroot',
    database: 'employee_db'
  },
  init()
);

function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What do you want to do?', 
            name : 'option',
            choices : ['view all departments', 
            'view all roles', 'view all employees', 
            'add a department', 'add a role', 
            'add an employee',
            'update an employee role'],
        }
    ]).then(answer => {
        switch (answer.option) {
            case 'view all departments' :
                viewDepartments();
                break;
            case 'view all employees' :  
                viewEmployees();
                break;
            case 'view all roles' :   
                viewRoles();
                break;
            case 'add a department' :
                addDepartment();
                break;
            case 'add a role' :
                addRole();
                break;
            case 'add an employee' :
                addEmployee();
                break;
            case 'update an employee role' :
                updateRole();
                break;
            default :
                console.log(answer.option + " is incorrect");    
        }
    })
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if(err) throw err;
        console.table(results);
        init();
     });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if(err) throw err;
        console.table(results);
        init();
     });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if(err) throw err;
        console.table(results);
        init();
     });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter department name?', 
            name : 'name',
        }
    ]).then( function(answer) {
        db.query("INSERT INTO department SET ?", answer, (err)=> {
            if(err) throw err;
            console.log("Deparatment added");
            init();
        })
        })

}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter first name?', 
            name : 'first_name',
        },
        {
            type: 'input',
            message: 'Enter last name?', 
            name : 'last_name',
        },
        {
            type: 'input',
            message: 'Enter role?', 
            name : 'role_id',
        },
        {
            type: 'input',
            message: 'Enter manager id?', 
            name : 'manager_id'
        }
    ]).then( function(answer) {
        db.query("INSERT INTO employee SET ?", answer, (err)=> {
            if(err) throw err;
            console.log("Employee added");
            init();
        })
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter job title?', 
            name : 'title',
        },
        {
            type: 'input',
            message: 'Enter salary?', 
            name : 'salary',
        },
        {
            type: 'list',
            message: 'Enter role?', 
            name : 'department_id',
            choices : [{name: 'Developer', value: 1,} , 
            {name: 'HR', value: 2}, {name: 'Marketing', value: 3}]
        }
    ]).then( function(answer) {
        db.query("INSERT INTO role SET ?", answer, (err)=> {
            if(err) throw err;
            console.log("Role added");
            init();
        })
        })

}

function updateRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee?', 
            name : 'employee_id',
            choices : [{name: 'Joe Trendy', value: 1,} , 
            {name: 'Jane Doe', value: 2}, {name: 'Jack Chu', value: 3}]
        },
        {
            type: 'list',
            message: 'Enter role?', 
            name : 'role_id',
            choices : [{name: 'Developer', value: 1,} , 
            {name: 'HR Manager', value: 3}, {name: 'TPM', value: 2}]
        }
    ]).then( function(answer) {
        db.query("UPDATE employee SET role_id = ? WHERE id= ?", [answer.role_id, answer.employee_id], (err)=> {
            if(err) throw err;
            console.log("Updated employee Role");
            init();
        })
        })

}


