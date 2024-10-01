import React from "react";
import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { SELECT_COLOUR2, COLOUR } from "./Colour"

interface FormSortByProps {
  brand: string;
  carBrands: string[];
  handleSortBrand: (event: SelectChangeEvent<string>) => void;
}

interface FormModelTypeProps {
  model: string;
  modelTypes: string[];
  handleSortModels: (event: SelectChangeEvent<string>) => void;
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
        id="sort-brand"
        value={brand as string}
        onChange={handleSortBrand}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                "&.Mui-selected": {
                  backgroundColor: SELECT_COLOUR2,
                  "&:hover": {
                    backgroundColor: SELECT_COLOUR2,
                  },
                },
                "&:hover": {
                  backgroundColor: SELECT_COLOUR2,
                },
              },
            },
          },
        }}
        sx ={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
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
        id="sort-order"
        value={sortOrder}
        onChange={handleSortOrderChange}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                "&.Mui-selected": {
                  backgroundColor: SELECT_COLOUR2,
                  "&:hover": {
                    backgroundColor: SELECT_COLOUR2,
                  },
                },
                "&:hover": {
                  backgroundColor: SELECT_COLOUR2,
                },
              },
            },
          },
        }}
        sx ={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
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


const FormModelType: React.FC<FormModelTypeProps> = ({
  model,
  modelTypes,
  handleSortModels,
}) => {
  return (
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <Select
        id="sort-model"
        value={model as string}
        onChange={handleSortModels}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                "&.Mui-selected": {
                  backgroundColor: SELECT_COLOUR2,
                  "&:hover": {
                    backgroundColor: SELECT_COLOUR2,
                  },
                },
                "&:hover": {
                  backgroundColor: SELECT_COLOUR2,
                },
              },
            },
          },
        }}
        sx ={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOUR,
          },
        }}
      >
        {/* Option to show all brands */}
        <MenuItem value="">All Models</MenuItem>{" "}
        {modelTypes.map((model: string, index: number) => (
          <MenuItem key={index} value={model}>
            {model}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { FormSortBy, FormSortOrder, FormModelType};
