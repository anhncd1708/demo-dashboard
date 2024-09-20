// Mock customer data
import { mockCustomers } from "../mock-data";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to check if a value is empty
const isEmpty = (value) => {
  return value === null || value === undefined || value === '' ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0);
};

// Fetch all customers
export const fetchAllCustomers = async () => {
  console.log("Fetching all customers");
  await delay(500); // Simulate network delay
  console.log("Fetched customers:", mockCustomers);
  return mockCustomers;
};

// Fetch a customer by ID
export const fetchCustomer = async (customerId) => {
  console.log("Fetching customer with ID:", customerId);
  await delay(500); // Simulate network delay
  const customer = mockCustomers.find(c => c.id === customerId);
  console.log("Found customer:", customer);
  if (!customer) {
    throw new Error('Customer not found');
  }
  return customer;
};

// Update a customer
export const updateCustomer = async (customerId, updatedData) => {
  await delay(500); // Simulate network delay
  const index = mockCustomers.findIndex(c => c.id === customerId);
  if (index === -1) {
    throw new Error('Customer not found');
  }
  mockCustomers[index] = { ...mockCustomers[index], ...updatedData };
  return mockCustomers[index];
};

// Fetch customers with any empty value
export const fetchCustomersWithEmptyFields = async () => {
  console.log("Fetching customers with empty fields");
  await delay(500); // Simulate network delay

  const customersWithEmptyFields = mockCustomers.filter(customer =>
    Object.values(customer).some(isEmpty)
  );

  console.log("Fetched customers with empty fields:", customersWithEmptyFields);
  return customersWithEmptyFields;
};