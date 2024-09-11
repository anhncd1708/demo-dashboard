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
  
  export const approveLoanRequest = async (loanRequestId) => {
    console.log("Approving loan request with ID:", loanRequestId);
    await delay(500); // Simulate network delay
    const loanRequestIndex = mockLoanRequests.findIndex(lr => lr.id === loanRequestId);
    if (loanRequestIndex === -1) {
      throw new Error('Loan request not found');
    }
    mockLoanRequests[loanRequestIndex] = {
      ...mockLoanRequests[loanRequestIndex],
      status: "Đã phê duyệt",
      approvalDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };
    return mockLoanRequests[loanRequestIndex];
  };