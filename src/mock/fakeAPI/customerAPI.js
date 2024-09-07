// Mock customer data
import { mockCustomers } from "../mock-data";
  
  // Simulate API delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
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