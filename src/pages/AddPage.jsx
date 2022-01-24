import { AddBoxOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../contexts/AdminProvider";

const AddPage = () => {
  const imagesRef = React.useRef(null);
  const [newProduct, setNewProduct] = useState({
    category: "",
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
      category: "",
      description: "",
      price: "",
      images: [],
    });
  };
  const handleDelete = (index) => {
    setNewProduct((prev) => {
      return {
        ...prev,
        images: prev.images.filter((i) => index !== i),
      };
    });
  };
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Add Page</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="color-select">Category</InputLabel>
            <Select
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              value={newProduct.category}
              labelId="category-select"
              label="Select categories"
            >
              <MenuItem value="necklace">Necklace</MenuItem>
              <MenuItem value="earring">Earring</MenuItem>
              <MenuItem value="ring">Ring</MenuItem>
            </Select>
          </FormControl>
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
          <Box className="image-input">
            <TextField
              inputRef={imagesRef}
              label="Enter image..."
              variant="standard"
            />
            <Stack direction="row" spacing={1}>
              {newProduct.images.map((item, index) => (
                <Chip
                  key={index}
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleDelete(item)}
                  label={item.slice(0, 10)}
                />
              ))}
            </Stack>
          </Box>

          <Button
            onClick={() => {
              setNewProduct({
                ...newProduct,
                images: [...newProduct.images, imagesRef.current.value],
              });
              imagesRef.current.value = "";
            }}
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
