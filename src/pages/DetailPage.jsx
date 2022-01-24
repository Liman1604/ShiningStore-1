import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const DetailPage = () => {
  const { getDetail, details } = useContext(ClientContext);
  const params = useParams();
  useEffect(() => {
    getDetail(params.id);
  }, []);

  console.log(details);
  if (!details) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div className="container py-4">
        <div className="row py-4">
          <div className="col-md-6">
            <img src={details.images} alt="" height="400" width="400" />
          </div>
          <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">{details.name}</h4>
            <h1 className="display-5">{details.description}</h1>
            <p className="lead fw-bolder">
              Rating {details.rating && details.rating.rate}
              <i className="fa fa-star"></i>
            </p>
            <h3 className="display-6 fw-bold my-4">${details.price}</h3>
            <Link to="/cart">
              <Button
                color="warning"
                variant="contained"
                startIcon={<ShoppingCart />}
              >
                Add To Cart
              </Button>
            </Link>
            <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
              Go to Cart
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
