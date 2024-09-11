import React, { useEffect, useState } from "react";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { Typography, CarCard } from "./Card";
import { Car } from "./types";
import { useCarContext } from "./CarContext";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import Loading from "./Loading";

const AZURE_BACKEND_CAR_URL = process.env.REACT_APP_AZURE_BACKEND_CAR_URL;

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const { carData, setCarData } = useCarContext();
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "year-asc" | "year-desc"
  >("price-asc");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [yearRange, setYearRange] = useState<number[]>([2000, 2024]);
  const [brand, setBrand] = useState<string | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const cardsPerPage = 6;

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

  // on page mount load all cars from flow backend
  useEffect(() => {
    if (carData === null) {
      setLoading(true);
      fetch(AZURE_BACKEND_CAR_URL as string, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log("Fetched data:", data);
          setCarData(data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [carData, setCarData]);

  // filter cars
  useEffect(() => {
    if (carData) {
      const filteredResults = carData
        .filter(
          (car) => car.price >= priceRange[0] && car.price <= priceRange[1],
        )
        .filter((car) => car.year >= yearRange[0] && car.year <= yearRange[1])
        .filter((car) => (brand ? car.brand === brand : true));

      // Sorting based on the selected sortOrder
      switch (sortOrder) {
        case "price-asc":
          filteredResults.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filteredResults.sort((a, b) => b.price - a.price);
          break;
        case "year-asc":
          filteredResults.sort((a, b) => a.year - b.year);
          break;
        case "year-desc":
          filteredResults.sort((a, b) => b.year - a.year);
          break;
        default:
          break;
      }

      // Apply pagination logic: slice the filtered results to show only the results for the current page
      const paginatedResults = filteredResults.slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage,
      );

      setSearchResults(paginatedResults);
      setTotalPages(Math.ceil(filteredResults.length / cardsPerPage));
    }
  }, [brand, priceRange, yearRange, currentPage, carData, sortOrder]);

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
            <Loading loading={loading} />
            {searchResults.map((result) => (
              <Grid item xs={4} key={result.id}>
                <CarCard result={result as Car} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            loading={loading}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
