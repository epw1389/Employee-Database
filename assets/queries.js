selectAllDepts = () => {
    return 'SELECT * FROM emp_DB.department'
};

selectAllRoles = () => {
    return `
    SELECT 
    A.id, 
    A.title,
    A.salary,
    B.name as 'department'

    FROM emp_DB.role A
    LEFT JOIN emp_DB.department B on A.department_id = B.id
    `
}

selectAllEmployees = () => {
    return `
    SELECT 
    A.id,
    concat(A.first_name, ' ', A.last_name) as empName,
    B.title,
    C.name as 'department',
    B.salary,
    concat(D.first_name, ' ', D.last_name) as manager
   
    FROM emp_DB.employee A 
    LEFT JOIN emp_DB.role B on A.role_id = B.id
    LEFT JOIN emp_DB.department C on B.department_id = C.id
    LEFT JOIN emp_DB.employee D on A.manager_id = D.id`
}

insertDepartment = (dept) => {
    return `INSERT INTO emp_DB.department SET name = '${dept}'`
}

insertRole = (title, salary, department) => {
    return `
    INSERT INTO emp_DB.role (title, salary, department_id)
    SELECT 
    '${title}',
    ${salary},
    A.id
    from emp_DB.department A
    WHERE A.name = '${department}'
    `
}

insertEmployee = (firstName, lastName, roleTitle) => {
    return `
    INSERT INTO emp_DB.employee (first_name, last_name, role_id)
	Select
	'${firstName}', 
	'${lastName}', 
	A.id
	FROM emp_DB.role A
	WHERE A.title = '${roleTitle}';

    `
}

module.exports = { selectAllDepts, selectAllRoles, selectAllEmployees, insertDepartment, insertRole, insertEmployee };

