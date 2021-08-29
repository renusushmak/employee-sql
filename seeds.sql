INSERT INTO department (name)
VALUES 
  ("Developer"),
  ("HR"),
  ("Marketing");

INSERT INTO role (title, salary, department_id) 
VALUES
  ("Developer", 100234.90, 1),
  ("TPM", 123435.60, 3),
  ("HR Manager", 234354.80, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
("Joe", "Trendy", 1, NULL),
("Jane", "Doe", 2, 1),
("Jack", "Chu", 3, 1);