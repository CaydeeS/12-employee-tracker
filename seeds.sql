INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Johnson", 1, 2), ("Jane", "Marks", 2, 1), ("Shelby", "Cooper", 3, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200, 1), ("Engineer", 100, 2), ("Intern", 10, 2);

INSERT INTO department (name)
VALUES ("Admin"), ("Engineering"), ("Education");