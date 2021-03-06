import React, { useContext, useEffect } from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import ProductsPagination from "../components/ProductsPagination";
import { ClientContext } from "../contexts/ClientProvider";
import "./Home.css";

const HomePage = () => {
  const { getProducts, products } = useContext(ClientContext);

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <div>
        <video autoPlay loop muted>
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-closeup-of-beautiful-jewellery-model-15910-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="home">
        <Filters />
        <div className="productContainer">
          {products.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      </div>
      <ProductsPagination />
    </div>
  );
};

export default HomePage;
