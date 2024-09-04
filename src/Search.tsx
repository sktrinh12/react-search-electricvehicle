import React, { useState } from "react";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { Typography, CarCard } from "./Card";
import { Car } from "./types";
import { FormSortOrder, FormSortBy } from "./Forms";
import { carData } from "./data";

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Car[]>(carData);
  const [sortField, setSortField] = useState<keyof Car["_source"]>("brand");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const sortedResults = [...searchResults].sort((a, b) => {
      const aValue = a._source[sortField];
      const bValue = b._source[sortField];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

    setSearchResults(sortedResults);
  };

  const handleSortFieldChange = (event: SelectChangeEvent<string>) => {
    setSortField(event.target.value as keyof Car["_source"]);
    handleSort();
  };

  // Update sort order and re-sort
  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as "asc" | "desc");
    handleSort();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        EV Search
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={6} sm={4} md={3}>
          <FormSortBy
            sortField={sortField}
            handleSortFieldChange={handleSortFieldChange}
          />
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <FormSortOrder
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderChange}
          />
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {searchResults.map((result) => (
          <Grid item xs={4} key={result._id}>
            <CarCard result={result as Car} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
