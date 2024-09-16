import React from "react";
import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
//import { carBrands } from "./data";

const SELECT_COLOUR = "#ecf0f1";

interface FormSortByProps {
  brand: string;
  carBrands: string[];
  handleSortBrand: (event: SelectChangeEvent<string>) => void;
}

interface FormSortOrderProps {
  sortOrder: string;
  handleSortOrderChange: (event: SelectChangeEvent<string>) => void;
}

const FormSortBy: React.FC<FormSortByProps> = ({
  brand,
  handleSortBrand,
  carBrands,
}) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <Select
        labelId="sort-field-label"
        id="sort-field"
        value={brand as string}
        onChange={handleSortBrand}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                backgroundColor: "#fff", // Default background color for menu items
                "&.Mui-selected": {
                  backgroundColor: SELECT_COLOUR, // Background color for selected item
                  "&:hover": {
                    backgroundColor: SELECT_COLOUR, // Keep same background color on hover when selected
                  },
                },
                "&:hover": {
                  backgroundColor: SELECT_COLOUR,
                },
              },
            },
          },
        }}
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
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                backgroundColor: "#fff", // Default background color for menu items
                "&.Mui-selected": {
                  backgroundColor: SELECT_COLOUR, // Background color for selected item
                  "&:hover": {
                    backgroundColor: SELECT_COLOUR, // Keep same background color on hover when selected
                  },
                },
                "&:hover": {
                  backgroundColor: SELECT_COLOUR,
                },
              },
            },
          },
        }}
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
