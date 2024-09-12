import React from "react";
import {
  SelectChangeEvent,
  Slider,
  Typography,
  Grid,
} from "@mui/material";
import { FormSortOrder, FormSortBy } from "./Forms";

type FilterPanelProps = {
  brand: string;
  sortOrder: string;
  priceRange: number[];
  yearRange: number[];
  carBrands: string[];
  handleSortBrand: (event: SelectChangeEvent<string>) => void;
  handleSortOrderChange: (event: SelectChangeEvent<string>) => void;
  handlePriceChange: (event: Event, newValue: number | number[]) => void;
  handleYearChange: (event: Event, newValue: number | number[]) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  brand,
  sortOrder,
  priceRange,
  yearRange,
  carBrands,
  handleSortOrderChange,
  handleSortBrand,
  handlePriceChange,
  handleYearChange,
}) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Typography gutterBottom>Brand</Typography>
      <FormSortBy brand={brand} carBrands={carBrands} handleSortBrand={handleSortBrand} />
      <Typography gutterBottom>Order</Typography>
      <FormSortOrder
        sortOrder={sortOrder}
        handleSortOrderChange={handleSortOrderChange}
      />

      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        sx={{ marginBottom: 2 }}
      />

      <Typography gutterBottom>Year Range</Typography>
      <Slider
        value={yearRange}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        min={2000}
        max={2024}
      />
    </Grid>
  );
};

export default FilterPanel;
