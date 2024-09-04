import React from "react";
import { SelectChangeEvent, FormControl, MenuItem, InputLabel, Select } from "@mui/material";

interface FormSortByProps {
  sortField: string;
  handleSortFieldChange: (event: SelectChangeEvent<string>) => void;
}

interface FormSortOrderProps {
  sortOrder: string;
  handleSortOrderChange: (event: SelectChangeEvent<string>) => void;
}

const FormSortBy: React.FC<FormSortByProps> = ({
  sortField,
  handleSortFieldChange,
}) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel id="sort-field-label">Sort By</InputLabel>
      <Select
        labelId="sort-field-label"
        id="sort-field"
        value={sortField as string}
        onChange={handleSortFieldChange}
      >
        <MenuItem value="brand">Brand</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
    </FormControl>
  );
};

const FormSortOrder: React.FC<FormSortOrderProps> = ({
  sortOrder,
  handleSortOrderChange,
}) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel id="sort-order-label">Sort Order</InputLabel>
      <Select
        labelId="sort-order-label"
        id="sort-order"
        value={sortOrder}
        onChange={handleSortOrderChange}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

export { FormSortBy, FormSortOrder };
