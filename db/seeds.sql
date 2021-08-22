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
    -- ("John", "Doe", 27, NULL),
    -- ("Jane", "Doe", 27, NULL),
    ("Someone", "Special", 21, 75),
    ("Noone", "Special", 21, 76);
    -- ("Pretty", "Love", 21, 1),
    -- ("Jason", "Skills", 21, 5),
    -- ("Rose", "Pedal", 21, 5),
    -- ("Daisy", "Flo", 19, 1),
    -- ("Suzie", "Que", 19, 1),
    -- ("Jiffy", "Peanut", 19, 1),
    -- ("Tom", "Allen", 19, 1),
    -- ("Tim", "Allen", 19, 1),
    -- ("Alfy", "Jo", 19, 1),
    -- ("Jon", "Smith", 19, 1),
    -- ("Consuela", "Bouffe", 19, 1),
    -- ("Monica", "Gellar", 19, 1),
    -- ("Rachael", "Green", 21, 1),
    -- ("Mateo", "Palela", 21, 1),
    -- ("Jersey", "Shore", 21, 1),
    -- ("Unfore", "Tunate", 21, 1),
    -- ("Kelly", "Greene", 21, 1),
    -- ("Palesa", "Thabo", 21, 1),
    -- ("Shootin", "Blank", 21, 1),
    -- ("Natan", "Palap", 21, 1),
    -- ("Jill", "Hill", 21, 1),
    -- ("Jamie", "Nate", 21, 1),
    -- ("Jessie", "Smudge", 21, 1),
    -- ("Annie", "Orphan", 22, 1),
    -- ("Jessica", "Jones", 22, 1),
    -- ("Jenny", "Block", 22, 1),
    -- ("Missy", "Hands", 22, 1),
    -- ("Lana", "Block", 22, 1),
    -- ("Annaliese", "Johnson", 22, 1),
    -- ("Nancy", "Jacobson", 22, 1),
    -- ("Michelle", "Pell", 22, 1);
