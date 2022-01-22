import axios from "axios";
import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { API } from "../helpers/const";

export const AdminContext = createContext();

const INIT_STATE = {
  jewerlys: null,
  jewerlysToEdit: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, jewerlys: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, jewerlysToEdit: action.payload };
    default:
      return state;
  }
};
const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addProduct = async (newProduct) => {
    try {
      await axios.post(API, newProduct);
      toast.success("Успешно добавлено");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка! Попробуйте снова");
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    let conf = window.confirm("You want to delette ?");
    try {
      if (conf) {
        await axios.delete(`${API}/${id}`);
        getProducts();
        toast.success("Успешно удалено!");
      } else {
        alert(`ok we won't delete it `);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ! Edit Product
  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedProduct = async (jewerly) => {
    try {
      await axios.patch(`${API}/${jewerly.id}`, jewerly);
      getProducts();
      toast.success("Изменения сохранены");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка! Попробуйте снова");
    }
  };
  return (
    <AdminContext.Provider
      value={{
        addProduct,
        getProducts,
        deleteProduct,
        getProductToEdit,
        saveEditedProduct,
        jewerlys: state.jewerlys,
        jewerlysToEdit: state.jewerlysToEdit,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
