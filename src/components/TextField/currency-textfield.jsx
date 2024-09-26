import React from "react";
import CurrencyInput from "react-currency-input-field";
import { InputAdornment } from "@mui/material";

export default function CurrencyTextField(props) {
  const { InputProps, onChange, value, ...other } = props;

  return (
    <CurrencyInput
      {...other}
      value={value}
      onValueChange={(value, name) => onChange({ target: { name, value } })}
      prefix="₫ "
      groupSeparator="."
      decimalSeparator=","
      decimalsLimit={2}
      style={{
        padding: "16.5px 14px",
        borderRadius: "4px",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
      }}
      startAdornment={
        InputProps?.startAdornment && (
          <InputAdornment position="start">
            {InputProps.startAdornment}
          </InputAdornment>
        )
      }
      endAdornment={
        InputProps?.endAdornment && (
          <InputAdornment position="end">
            {InputProps.endAdornment}
          </InputAdornment>
        )
      }
    />
  );
}
