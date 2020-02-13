USE emp_DB;

-- Insert into department table
INSERT INTO emp_DB.department (name)
VALUES ("Technology"), ("Human Resources"), ("Sales"), ("Finance");

-- Insert into role table
INSERT INTO emp_DB.role (title, salary, department_id)
VALUES
('Engineer', 95000, 1),
('Accountant', 80000, 4),
('Sales Manager', 75000, 3),
('HR Manager', 87000, 2);


-- Insert into employee table
INSERT INTO emp_DB.employee (first_name, last_name, role_id)
VALUES
('Lisa', 'Walter', 1),
('Ranjan', 'Biswas', 2),
('Bernie', 'Silverstein', 4),
('Daniel', 'Smith', 1),
('Sarah', 'Walter', 3);


-- Add a manager to two employee
UPDATE emp_DB.employee
SET manager_id = 7
WHERE (id = 1 OR id = 6)