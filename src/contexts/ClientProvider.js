import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { API } from "../helpers/const";

export const ClientContext = createContext();

const INIT_STATE = {
  products: null,
  details: null,
  cart: null,
  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_DETAILS":
      return { ...state, details: action.payload };
    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    case "DELETE_PRODUCT_FROM_CART":
      return { ...state, cartCount: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let response = await axios(`${API}/${window.location.search}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! Pagination

  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state.products) {
      setPosts(state.products);
    }
  }, [state.products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductsCount = posts.length;

  // ! CART
  //! addProductToCart
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let productCart = {
      product: product,
      count: 1,
      subPrice: product.price,
    };
    cart.products.push(productCart);
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };
  //! checkProductInCart
  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }

    let check = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  // ! deleteProductFromCart
  const deleteProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => {
      return item.product.id !== id;
    });

    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "DELETE_PRODUCT_FROM_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  // ! CART ADMIN

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
        return item;
      } else {
        return item;
      }
    });
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const deleteCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => {
      return item.product.id !== id;
    });
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
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
        setCurrentPage,
        addProductToCart,
        checkProductInCart,
        deleteProductFromCart,
        getCart,
        deleteCart,
        changeCount,
        products: currentProducts,
        totalProductsCount,
        productsPerPage,
        currentPage,
        details: state.details,
        cartCount: state.cartCount,
        cart: state.cart,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
