import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AppraisalTableRow({
  id,
  customerName,
  loanAmount,
  loanPurpose,
  assetType,
  assetValue,
  selected,
  handleClick,
  onViewDetails,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={(event) => handleClick(event, customerName)}
        />
      </TableCell> */}

      <TableCell>{id}</TableCell>
      <TableCell>{customerName}</TableCell>
      <TableCell>{loanAmount.toLocaleString()} VND</TableCell>
      <TableCell>{loanPurpose}</TableCell>
      <TableCell>{assetType}</TableCell>
      <TableCell>{assetValue.toLocaleString()} VND</TableCell>
      <TableCell align="right">
        <Tooltip title="Xem chi tiết">
          <IconButton onClick={() => onViewDetails(id)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
