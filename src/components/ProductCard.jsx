import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { Card } from "react-bootstrap";
import { ClientContext } from "../contexts/ClientProvider";

const ProductCard = (props) => {
  const { addProductToCart, checkProductInCart, deleteProductFromCart } =
    useContext(ClientContext);
  return (
    <>
      <div className="products">
        <Card className="product_card my-4">
          <div className="image-block">
            <Card.Img
              className="backside_image card_image"
              variant="top"
              src={props.item.images[0]}
              alt="product-img"
            />
            <Link to={`/product-detail/${props.item.id}`}>
              <img
                alt="product-img"
                className="frontside_image card_image"
                src={props.item.images[1]}
              />
            </Link>
          </div>
          <Card.Body>
            <Card.Title>{props.item.category}</Card.Title>
            <Card.Subtitle>
              {/* <Rating rating={props.item.rating} /> */}
              <span
                style={{
                  marginTop: 200,
                  display: "block",
                  width: "100%",
                }}
              >
                {props.item.description}
              </span>
              <div
                style={{
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {`$ ${props.item.price}`}
              </div>
            </Card.Subtitle>
            {checkProductInCart(props.item.id) ? (
              <Button
                className="card_button"
                color="warning"
                variant="contained"
                onClick={() => deleteProductFromCart(props.item.id)}
                startIcon={<ShoppingCart />}
              >
                In The Cart
              </Button>
            ) : (
              <Button
                className="card_button"
                variant="contained"
                onClick={() => addProductToCart(props.item)}
                startIcon={<ShoppingCart />}
              >
                Add To Cart
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default ProductCard;
