INSERT INTO departments (department)
VALUES
    ( 'Sales'),
    ( 'Engineering'),
    ( 'Finance'),
    ( 'Legal');

INSERT INTO roles (title, salary, department_id)
    ("Salesperson", 50000, 1 ),
    ("Lawyer", 100000, 4),
    ("Accountant", 75000, 3),
    ("Software Engineer", 100000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    ("John", "Doe"),
    ("Jane", "Doe"),
    ("Someone", "Special"),
    ("Noone", "Special"),
    ("Pretty", "Love");
