import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./style.scss";
import { Box } from "@mui/material";

export default function ViewMode({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [val, setVal] = React.useState("3");

  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box m={0} className="view-mode">
      <FormControl sx={{ minWidth: 80 }} className="form-control">
        <label htmlFor="demo-simple-select-helper" className="label">
          Filter:
        </label>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={val}
          label="Filter"
          autoWidth
          onChange={handleChange}
          className="select-control"
          sx={{
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
          }}
        >
          <MenuItem value={6}>2x2</MenuItem>
          <MenuItem value={4}>3x3</MenuItem>
          <MenuItem value={3}>4x4</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
