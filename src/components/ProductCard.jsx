import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import { BackSide, Flippy, FrontSide } from "react-flippy";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

const ProductCard = (props) => {
  console.log(props.item.images);
  return (
    <>
      <Flippy flipOnHover={false} flipOnHover={true} flipDirection="horizontal">
        <FrontSide animationDuration="1000">
          <CardMedia
            component="img"
            height="140"
            image={props.item.images[0]}
            alt="green iguana"
          />
        </FrontSide>
        <BackSide animationDuration="1000">{props.item.name}</BackSide>
        <Link to="/">
          <Button
            color="warning"
            variant="contained"
            startIcon={<ShoppingCart />}
          >
            Add To Cart
          </Button>
        </Link>
      </Flippy>
    </>
  );
};
export default ProductCard;
