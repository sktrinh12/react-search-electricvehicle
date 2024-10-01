import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLOUR, SELECT_COLOUR2 } from "./Colour";

interface EmptyCartButtonProps {
  handleEmptyCart: () => void;
}

const EmptyCartButton = ({ handleEmptyCart }: EmptyCartButtonProps) => {
  return (
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleEmptyCart}
        size="small"
        sx={{
          textTransform: "none", // Disable uppercase text
          borderColor: COLOUR,
          color: COLOUR,
          "&:hover": {
            borderColor: COLOUR,
            backgroundColor: SELECT_COLOUR2,
          },
        }}
      >
        Empty Cart
      </Button>
  );
};

export default EmptyCartButton;
