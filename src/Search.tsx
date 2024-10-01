import React, { useEffect, useState } from "react";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { Typography, CarCard } from "./Card";
import { Car } from "./types";
import { useCarContext } from "./CarContext";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import Loading from "./Loading";
import ShoppingCartHeader from "./ShoppingCartHeader";
import { modelTypes } from "./data";

// PA = POWER AUTOMATE
const PA_BACKEND_CAR_URL = process.env.REACT_APP_PA_BACKEND_CAR_URL;
const PA_UNIQUE_CAR_BRANDS_URL = process.env.REACT_APP_PA_UNIQUE_CAR_BRANDS_URL;

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const { carData, setCarData, currentPage, setCurrentPage } = useCarContext();
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "year-asc" | "year-desc"
  >("price-asc");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [yearRange, setYearRange] = useState<number[]>([2000, 2024]);
  const [brand, setBrand] = useState<string | "">("");
  const [model, setModel] = useState<string | "">("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [carBrands, setCarBrands] = useState<string[]>([]);

  const cardsPerPage = 6;

  const handleSortBrand = (event: SelectChangeEvent<string>) => {
    setBrand(event.target.value as string);
  };

  const handleSortModels = (event: SelectChangeEvent<string>) => {
    setModel(event.target.value as string);
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
      fetch(PA_BACKEND_CAR_URL as string, {
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
        .filter((car) => (brand ? car.brand === brand : true))
        .filter((car) => (model ? car.model_type === model : true));

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
  }, [brand, priceRange, yearRange, currentPage, carData, sortOrder, model]);

  // fetch unique car brands
  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await fetch(PA_UNIQUE_CAR_BRANDS_URL as string, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(
            "Network response error for fetching car brands list",
          );
        }

        const data = await response.json();
        setCarBrands(data);
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };

    fetchCarBrands();
  }, []);

  return (
    <Box sx={{ padding: 0, margin: 0, maxWidth: "100%" }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            EV Search
          </Typography>
        </Grid>
        <Grid item>
          <ShoppingCartHeader />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <FilterPanel
          brand={brand}
          model={model}
          sortOrder={sortOrder}
          priceRange={priceRange}
          yearRange={yearRange}
          carBrands={carBrands}
          modelTypes={modelTypes}
          handleSortModels={handleSortModels}
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
