import { SaveAlt } from "@mui/icons-material";
import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

const EditPage = () => {
  const params = useParams();
  const { getProductToEdit, jewerlysToEdit, saveEditedProduct } =
    useContext(AdminContext);
  const [jewerly, setJewerly] = useState(jewerlysToEdit);
  const navigate = useNavigate();

  useEffect(() => {
    setJewerly(jewerlysToEdit);
  }, [jewerlysToEdit]);
  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in jewerly) {
      if (!jewerly[key]) {
        alert("Заполните поля!!!");
        return;
      }
    }
    saveEditedProduct(jewerly);
    navigate("/admin-panel");
  };

  if (!jewerly) {
    return <h2>Loading...</h2>;
  }
  console.log(jewerly);
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Edit Page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={jewerly.name}
            onChange={(e) => setJewerly({ ...jewerly, name: e.target.value })}
            label="Enter name..."
            variant="standard"
          />
          <TextField
            value={jewerly.description}
            onChange={(e) =>
              setJewerly({ ...jewerly, description: e.target.value })
            }
            label="Enter description..."
            variant="standard"
          />
          <TextField
            value={jewerly.price}
            onChange={(e) => setJewerly({ ...jewerly, price: +e.target.value })}
            label="Enter price..."
            variant="standard"
            type="number"
          />
          <TextField
            value={jewerly.images}
            onChange={(e) =>
              setJewerly({
                ...jewerly,
                images: e.target.value,
              })
            }
            label="Enter image..."
            variant="standard"
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            startIcon={<SaveAlt />}
          >
            Save Changes
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditPage;
