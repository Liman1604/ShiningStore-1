import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const ClientContext = createContext();

const INIT_STATE = {
  products: null,
  details: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_DETAILS":
      return { ...state, details: action.payload };
    default:
      return state;
  }
};
const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let response = await axios(`${API}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! CART

  const addProductToCart = (product) => {
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // if (!cart) {
    //   cart = {
    //     products: [],
    //     totalPrice: 0,
    //   };
    // }
    // let productCart = {
    //   product: product,
    //   count: 1,
    //   subPrice: product.price,
    // };
    // cart.products.push(productCart);
    // cart.totalPrice = cart.products.reduce((prev, item) => {
    //   return prev + item.subPrice;
    // }, 0);
    // localStorage.setItem("cart", JSON.stringify(cart));
    // let action = {
    //   type: "ADD_PRODUCT_TO_CART",
    //   payload: cart.products.length,
    // };
    // dispatch(action);
  };
  // ! Detail Page

  const getDetail = async (id) => {
    try {
      let response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_DETAILS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClientContext.Provider
      value={{
        getProducts,
        getDetail,
        addProductToCart,
        products: state.products,
        details: state.details,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
