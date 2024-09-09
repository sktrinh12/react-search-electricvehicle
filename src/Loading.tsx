import React from "react";
import { Box } from "@mui/material";
import ReactLoading from "react-loading";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <ReactLoading type="spin" color="#00BFFF" height={100} width={100} />
        </Box>
      )}
    </>
  );
};

export default Loading;
