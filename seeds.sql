USE emp_db;

-- Insert into department table
INSERT INTO emp_db.department (name)
VALUES ("Technology"), ("Human Resources"), ("Sales/Marketing"), ("Accounting/Finance");

-- Insert into role table
INSERT INTO emp_db.role (title, salary, department_id)
VALUES
('Engineer', 90000, 1),
('HR Business Partner', 80000, 2),
('Sales Manager', 64990, 3),
('Accountant', 75000, 4);

-- Insert into employee table
INSERT INTO emp_db.employee (first_name, last_name, role_id)
VALUES
('Lisa', 'Walter', 1),
('Bernie', 'Silverstein', 2),
('Ranjan', 'Biswas', 4);

-- Add a manager to two employee
UPDATE emp_db.employee
SET manager_id = 7
WHERE (id = 1 OR id = 6)