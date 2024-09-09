import React from "react";
import { Button, Box } from "@mui/material";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        sx={{
          textTransform: "none",
          padding: "22px 14px",
          "&:hover": {
            backgroundColor: "#b0b0b0",
          },
        }}
      >
        1 &laquo;
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          fontSize: "2rem",
          "&:hover": {
            backgroundColor: "#b0b0b0",
          },
        }}
      >
        &lsaquo;
      </Button>

      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          fontSize: "2rem",
          "&:hover": {
            backgroundColor: "#b0b0b0",
          },
        }}
      >
        &rsaquo;
      </Button>
      <Button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        sx={{
          textTransform: "none",
          padding: "22px 14px",
          "&:hover": {
            backgroundColor: "#b0b0b0",
          },
        }}
      >
        {totalPages} »
      </Button>
    </Box>
  );
};

export default Pagination;
