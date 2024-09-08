import { mockLoanRequests } from "../mock-data";
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  export const fetchLoanRequests = async () => {
    await delay(500); // Simulate network delay
    return mockLoanRequests;
  };
  
  
  export const fetchLoanRequest = async (loanRequestId) => {
    console.log("Fetching loan request with ID:", loanRequestId);
    await delay(500); // Simulate network delay
    const loanRequest = mockLoanRequests.find(lr => lr.id === loanRequestId);
    console.log("Found loan request:", loanRequest);
    if (!loanRequest) {
      throw new Error('Loan request not found');
    }
    return loanRequest;
  };