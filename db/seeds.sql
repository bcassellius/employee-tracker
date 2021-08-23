INSERT INTO departments (department)
VALUES
    ( 'Sales'),
    ( 'Engineering'),
    ( 'Finance'),
    ( 'Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Salesperson", 50000, 1 ),
    ("Lawyer", 100000, 4),
    ("Software Engineer", 100000, 2),
    ("Accountant", 75000, 3),
    ("Lead Legal Team", 110000, 4),
    ("Lead Engineer", 110000, 2),
    ("Lead Sales", 75000, 1),
    ("Lead Finance", 85000, 3),
    ("CEO", 200000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 27, NULL),
    ("Jane", "Doe", 27, NULL),
    ("Someone", "Special", 21, 75),
    ("Noone", "Special", 21, 76);
    ("Pretty", "Love", 21, 75),
    ("Jason", "Skills", 19, 75),
    ("Rose", "Pedal", 20, 75),
    ("Daisy", "Flo", 21, 151),
    ("Suzie", "Que", 19, 151),
    ("Jiffy", "Peanut", 19, 151),
    ("Tom", "Allen", 23, 151),
    ("Tim", "Allen", 24, 151),
    ("Alfy", "Jo", 25, 151),
    ("Jon", "Smith", 26, 151),
    ("Consuela", "Bouffe", 27, null),
    ("Monica", "Gellar", 28, 151),
    ("Rachael", "Green", 29, 151),
    ("Mateo", "Palela", 30, NULL),
    ("Jersey", "Shore", 31, 151),
    ("Unfore", "Tunate", 32, 151),
    ("Kelly", "Greene", 33, 75),
    ("Palesa", "Thabo", 32, 75),
    ("Shootin", "Blank", 32, 75),
    ("Natan", "Palap", 33, 75),
    ("Jill", "Hill", 34, 75),
    ("Jamie", "Nate", 35, 76),
    ("Jessie", "Smudge", 21, NULL),
    ("Annie", "Orphan", 22, 76),
    ("Jessica", "Jones", 37, 76),
    ("Jenny", "Block", 36, 76),
    ("Missy", "Hands", 37, 148),
    ("Lana", "Block", 38, 148),
    ("Annaliese", "Johnson", 34, 76),
    ("Nancy", "Jacobson", 21, 76),
    ("Michelle", "Pell", 20, 76);
