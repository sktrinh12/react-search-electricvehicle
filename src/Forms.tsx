import React from "react";
import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { carBrands } from "./data";

interface FormSortByProps {
  brand: string;
  handleSortBrand: (event: SelectChangeEvent<string>) => void;
}

interface FormSortOrderProps {
  sortOrder: string;
  handleSortOrderChange: (event: SelectChangeEvent<string>) => void;
}

const FormSortBy: React.FC<FormSortByProps> = ({ brand, handleSortBrand }) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <Select
        labelId="sort-field-label"
        id="sort-field"
        value={brand as string}
        onChange={handleSortBrand}
      >
        {/* Option to show all brands */}
        <MenuItem value="">All Brands</MenuItem>{" "}
        {carBrands.map((carBrand: string, index: number) => (
          <MenuItem key={index} value={carBrand}>
            {carBrand}
          </MenuItem>
        ))}
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
      <Select
        labelId="sort-order-label"
        id="sort-order"
        value={sortOrder}
        onChange={handleSortOrderChange}
      >
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
        <MenuItem value="year-asc">Year: Old to New</MenuItem>
        <MenuItem value="year-desc">Year: New to Old</MenuItem>
      </Select>
    </FormControl>
  );
};

export { FormSortBy, FormSortOrder };
