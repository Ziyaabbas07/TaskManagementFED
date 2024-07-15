export const getEmployeeNameById = (employees, id) => {
    const employee = employees.find(emp => emp.userId === id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
};
