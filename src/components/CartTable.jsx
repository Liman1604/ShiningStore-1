import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ClientContext } from "../contexts/ClientProvider";
import { TableFooter, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function CartTable() {
  const { getCart, cart, changeCount, deleteCart } =
    React.useContext(ClientContext);

  React.useEffect(() => {
    getCart();
  }, []);
  if (!cart) {
    return <h2>Loading...</h2>;
  }
  // console.log(cart.products);
  return (
    <>
      <TableContainer component={Paper} className="my-5">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Кол-во</TableCell>
              <TableCell align="right">Сумма</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell component="th" scope="row">
                  {item.product.category}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={item.product.images[0]}
                    alt="cart-img"
                    width={100}
                  />
                </TableCell>
                <TableCell align="right">{item.product.price} сом</TableCell>
                <TableCell align="right">
                  <input
                    type="number"
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        return;
                      }
                      changeCount(e.target.value, item.product.id);
                    }}
                    value={item.count}
                  />
                </TableCell>
                <TableCell align="right">{item.subPrice} сом</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<Delete />}
                    type="submit"
                    variant="contained"
                    onClick={() => deleteCart(item.product.id)}
                  ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong style={{ fontSize: 22 }}>Итоговая сумма:</strong>
              </TableCell>
              <TableCell colSpan={1} align="right">
                <strong style={{ fontSize: 22 }}>{cart.totalPrice} сом</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <div className="order-button">
        <Button variant="contained">Оформить заказ</Button>
      </div>
    </>
  );
}
