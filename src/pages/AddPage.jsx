import { AddBoxOutlined } from "@mui/icons-material";
import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../contexts/AdminProvider";

const AddPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });
  const { addProduct } = useContext(AdminContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    // ! Проверка на пустоту
    for (let key in newProduct) {
      if (!newProduct[key]) {
        alert("Заполните поля!!!");
        return;
      }
    }
    addProduct(newProduct);
    // ! Очищаем инпуты
    setNewProduct({
      name: "",
      description: "",
      price: "",
      images: [],
    });
  };
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Add Page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            label="Enter name..."
            variant="standard"
          />
          <TextField
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            label="Enter description..."
            variant="standard"
          />
          <TextField
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: +e.target.value })
            }
            label="Enter price..."
            variant="standard"
            type="number"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                images: e.target.value,
              })
            }
            value={newProduct.images}
            label="Enter image..."
            variant="standard"
          />
          <Button
            onClick={() =>
              setNewProduct({
                ...newProduct,
                images: [...newProduct.images],
              })
            }
            variant="contained"
          >
            Add image
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddBoxOutlined />}
          >
            Add
          </Button>
        </form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AddPage;
