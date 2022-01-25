import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ClientContext } from "../contexts/ClientProvider";
import { Slider } from "@material-ui/core";

const Filters = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getProducts } = React.useContext(ClientContext);
  const [categoryValue, setCategoryValue] = useState(
    search.get("category") || ""
  );

  const [priceValue, setPriceValue] = useState(
    Number(search.get("price_lte")) || 0
  );

  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setCategoryValue(search.get("category") || "");
    setPriceValue(Number(search.get("price_lte")) || 0);
    getProducts();
  };

  const resetFilter = () => {
    navigate("/");
    setCategoryValue("");
    setPriceValue(0);
    getProducts();
  };
  const [rate, setRate] = useState(3);
  return (
    <div className="filters">
      <span className="title">FIlter products</span>
      <span>
        <Form.Check
          value={"necklace"}
          onChange={(e) => filterProducts("category", e.target.value)}
          inline
          label="Necklace"
          name="group1"
          type="radio"
          id={`inline-1`}
        />
      </span>
      <span>
        <Form.Check
          value={"earring"}
          onChange={(e) => filterProducts("category", e.target.value)}
          inline
          label="Earring"
          name="group1"
          type="radio"
          id={`inline-2`}
        />
      </span>
      <span>
        <Form.Check
          value={"ring"}
          onChange={(e) => filterProducts("category", e.target.value)}
          inline
          label="Ring"
          name="group1"
          type="radio"
          id={`inline-2`}
        />
      </span>
      {/* <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
        />
      </span> */}
      <Slider
        value={priceValue}
        onChange={(e, value) => {
          console.log(value);
          filterProducts("price_lte", value);
        }}
        defaultValue={10}
        valueLabelDisplay="auto"
        step={10}
        min={10}
        max={500}
      />

      <Button onClick={resetFilter} variant="light">
        Clear filters
      </Button>
    </div>
  );
};

export default Filters;
