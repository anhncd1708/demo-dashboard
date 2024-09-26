// Mock employee data
import { mockEmployees } from "../mock-data";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if a value is empty
const isEmpty = (value) => {
  return value === null || value === undefined || value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0);
};

// Fetch all employees
export const fetchAllEmployees = async () => {
  console.log("Fetching all employees");
  await delay(500); // Simulate network delay
  console.log("Fetched employees:", mockEmployees);
  return mockEmployees;
};

// Fetch an employee by code
export const fetchEmployee = async (employeeCode) => {
  console.log("Fetching employee with code:", employeeCode);
  await delay(500); // Simulate network delay
  const employee = mockEmployees.find(e => e.employees_code === employeeCode);
  console.log("Found employee:", employee);
  if (!employee) {
    throw new Error('Employee not found');
  }
  return employee;
};

// Update an employee
export const updateEmployee = async (employeeCode, updatedData) => {
  await delay(500); // Simulate network delay
  const index = mockEmployees.findIndex(e => e.employees_code === employeeCode);
  if (index === -1) {
    throw new Error('Employee not found');
  }
  mockEmployees[index] = { ...mockEmployees[index], ...updatedData };
  return mockEmployees[index];
};

// Fetch employees with any empty value
export const fetchEmployeesWithEmptyFields = async () => {
  console.log("Fetching employees with empty fields");
  await delay(500); // Simulate network delay

  const employeesWithEmptyFields = mockEmployees.filter(employee =>
    Object.values(employee).some(isEmpty)
  );

  console.log("Fetched employees with empty fields:", employeesWithEmptyFields);
  return employeesWithEmptyFields;
};

// Fetch employees by role
export const fetchEmployeesByRole = async (role) => {
  console.log("Fetching employees with role:", role);
  await delay(500); // Simulate network delay

  const employeesWithRole = mockEmployees.filter(employee => employee.position_name === role);

  console.log("Fetched employees with role:", employeesWithRole);
  return employeesWithRole;
};

// Fetch active employees
export const fetchActiveEmployees = async () => {
  console.log("Fetching active employees");
  await delay(500); // Simulate network delay

  const activeEmployees = mockEmployees.filter(employee => employee.is_active && employee.is_working);

  console.log("Fetched active employees:", activeEmployees);
  return activeEmployees;
};