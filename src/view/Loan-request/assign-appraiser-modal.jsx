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
  Checkbox,
} from "@mui/material";
import { fetchEmployeesByRole } from "../../mock/fakeAPI/empAPI";

const AssignAppraiserModal = ({ open, handleClose, onAssign }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      const appraisers = await fetchEmployeesByRole("Cấp nhân viên tín dụng");
      setEmployees(appraisers);
    };
    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.employees_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeToggle = (employeeCode) => {
    const currentIndex = selectedEmployees.indexOf(employeeCode);
    const newSelectedEmployees = [...selectedEmployees];

    if (currentIndex === -1) {
      newSelectedEmployees.push(employeeCode);
    } else {
      newSelectedEmployees.splice(currentIndex, 1);
    }

    setSelectedEmployees(newSelectedEmployees);
  };

  const handleAssignEmployees = () => {
    onAssign(selectedEmployees);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Chọn thẩm định viên</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tìm kiếm nhân viên"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List>
          {filteredEmployees.map((employee) => {
            const isSelected =
              selectedEmployees.indexOf(employee.employees_code) !== -1;
            return (
              <ListItem
                button
                key={employee.employees_code}
                onClick={() => handleEmployeeToggle(employee.employees_code)}
              >
                <Checkbox
                  edge="start"
                  checked={isSelected}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText
                  primary={employee.employees_name}
                  secondary={employee.employees_code}
                />
              </ListItem>
            );
          })}
        </List>
        <Button
          onClick={handleAssignEmployees}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Xác nhận
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AssignAppraiserModal;
