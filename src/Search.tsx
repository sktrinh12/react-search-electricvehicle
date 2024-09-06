import React, { useEffect, useState } from "react";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { Typography, CarCard } from "./Card";
import { Car } from "./types";
import { carData } from "./data";
import FilterPanel from "./FilterPanel";

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Car[]>(carData);
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "year-asc" | "year-desc"
  >("price-asc");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [yearRange, setYearRange] = useState<number[]>([1985, 2024]);
  const [brand, setBrand] = useState<string | "">("");

  const handleSortBrand = (event: SelectChangeEvent<string>) => {
    setBrand(event.target.value as string);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(
      event.target.value as
        | "price-asc"
        | "price-desc"
        | "year-asc"
        | "year-desc",
    );
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };

  //useEffect(() => {
  // Fetch or initialize allCars here
  // Example: fetchData().then(data => setAllCars(data));
  //}, []);

  useEffect(() => {
    const filteredResults = carData
      .filter(
        (car) =>
          car._source.price >= priceRange[0] &&
          car._source.price <= priceRange[1],
      )
      .filter(
        (car) =>
          car._source.year >= yearRange[0] && car._source.year <= yearRange[1],
      )
      .filter((car) => (brand ? car._source.brand === brand : true));

    // Sorting based on the selected sortOrder
    switch (sortOrder) {
      case "price-asc":
        filteredResults.sort((a, b) => a._source.price - b._source.price);
        break;
      case "price-desc":
        filteredResults.sort((a, b) => b._source.price - a._source.price);
        break;
      case "year-asc":
        filteredResults.sort((a, b) => a._source.year - b._source.year);
        break;
      case "year-desc":
        filteredResults.sort((a, b) => b._source.year - a._source.year);
        break;
      default:
        break;
    }

    setSearchResults(filteredResults);
  }, [brand, priceRange, yearRange, searchResults]);

  return (
    <Box sx={{ padding: 0, margin: 0, maxWidth: "100%" }}>
      <Typography variant="h4" gutterBottom>
        EV Search
      </Typography>
      <Grid container spacing={2}>
        <FilterPanel
          brand={brand}
          sortOrder={sortOrder}
          priceRange={priceRange}
          yearRange={yearRange}
          handleSortOrderChange={handleSortOrderChange}
          handleSortBrand={handleSortBrand}
          handlePriceChange={handlePriceChange}
          handleYearChange={handleYearChange}
        />

        <Grid item xs={12} md={9}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {searchResults.map((result) => (
              <Grid item xs={4} key={result._id}>
                <CarCard result={result as Car} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
