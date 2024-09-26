import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { fetchAllCustomers } from "../../mock/fakeAPI/customerAPI";

export default function CustomerSelectionModal({ open, onClose, onSelect }) {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadCustomers = async () => {
      const allCustomers = await fetchAllCustomers();
      setCustomers(allCustomers);
    };
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chọn khách hàng</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tìm kiếm khách hàng"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List>
          {filteredCustomers.map((customer) => (
            <ListItem
              button
              key={customer.id}
              onClick={() => onSelect(customer)}
            >
              <ListItemText
                primary={customer.name}
                secondary={customer.membershipNumber}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
