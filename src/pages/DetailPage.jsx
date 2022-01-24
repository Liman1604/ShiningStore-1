import { ShoppingCart } from "@mui/icons-material";
import CallMissedOutgoingOutlinedIcon from "@mui/icons-material/CallMissedOutgoingOutlined";
import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SliderDetails from "../components/SliderDetails";
import { ClientContext } from "../contexts/ClientProvider";

const DetailPage = () => {
  const { getDetail, details } = useContext(ClientContext);
  const params = useParams();
  useEffect(() => {
    getDetail(params.id);
  }, []);

  if (!details) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div className="container py-4">
        <div className="row py-4">
          <div className="col-md-6">
            <img src={details.images} alt="" height="400" width="400" />
            <SliderDetails />
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
            <Link to="/cart">
              <Button
                color="warning"
                variant="contained"
                startIcon={<CallMissedOutgoingOutlinedIcon />}
              >
                Go to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
