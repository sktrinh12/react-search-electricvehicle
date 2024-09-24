import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Add, Remove } from "@mui/icons-material";
import { CartItem } from "./types";
import { useCart } from "./CartContext";
import BackButton from "./BackButton";

const Cart: React.FC = () => {
  const { cart, setCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const calculateTotal = (updatedCart: CartItem[]) => {
    const total = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
    setEstimatedTax(total * 0.1); // Assume 10% tax
  };

  const updateQuantity = (id: number, delta: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <BackButton handleBack={handleBack} />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
        </Grid>
      </Grid>
      {cart.length > 0 ? (
        <Grid container spacing={2}>
          {cart.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        width="100%"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/400x300"; // Fallback image URL
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1">
                        Price: ${item.price}
                      </Typography>
                      <Typography variant="body1">
                        Quantity: {item.quantity}
                      </Typography>
                      <div>
                        <IconButton onClick={() => updateQuantity(item.id, 1)}>
                          <Add />
                        </IconButton>
                        <IconButton onClick={() => updateQuantity(item.id, -1)}>
                          <Remove />
                        </IconButton>
                        <IconButton onClick={() => removeItem(item.id)}>
                          <Delete />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h6">Total: ${totalPrice}</Typography>
            <Typography variant="body1">
              Estimated Tax: ${estimatedTax.toFixed(2)}
            </Typography>
            <Typography variant="h5">
              Final Total: ${(totalPrice + estimatedTax).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}
    </>
  );
};

export default Cart;
