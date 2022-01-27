import { Delete, ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Button,
  Container,
  Input,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const FormSale = () => {
  const { getCart, cart, changeCount, deleteCart, cartCount, getProducts } =
    React.useContext(ClientContext);
  console.log(cart);
  React.useEffect(() => {
    getCart();
  }, []);
  if (!cart) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Container className="FormBlock">
        <div className="firstBlock">
          <form>
            <h3>Платежный адрес</h3>
            <div>
              <strong>
                <p>
                  <img
                    width="30"
                    src="https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1643178843~hmac=49d38d3ae62c267747289c97c100588c"
                    alt=""
                  />{" "}
                  ФИО:
                </p>
              </strong>
              <Input
                required
                placeholder="Аметов Сулейман Рустамович"
                type="text"
              />
            </div>
            <div>
              <strong>
                <p>
                  <img
                    width="30"
                    src="https://cdn-icons.flaticon.com/png/512/542/premium/542689.png?token=exp=1643179102~hmac=735dd4d474160057b661bfa76683fa06"
                    alt=""
                  />{" "}
                  Email:
                </p>
              </strong>
              <Input
                required
                placeholder="suliman16042005@gmail.com"
                type="email"
              />
            </div>
            <div>
              {" "}
              <strong>
                <p>
                  {" "}
                  <img
                    width="30"
                    src="https://cdn-icons-png.flaticon.com/512/3203/3203071.png"
                    alt=""
                  />{" "}
                  Адрес:
                </p>
              </strong>
              <Input required placeholder="Томская 44-29" type="text" />
            </div>
            <div>
              <strong>
                <p>
                  {" "}
                  <img
                    width="30"
                    src="https://cdn-icons.flaticon.com/png/512/2882/premium/2882328.png?token=exp=1643179258~hmac=ed4756cbaa3afb5e8dee1dd15a3cc3b6"
                    alt=""
                  />{" "}
                  Город:
                </p>
              </strong>
              <Input required placeholder="Москва" type="text" />{" "}
            </div>
            <div>
              {" "}
              <strong>
                <p>Государство:</p>
              </strong>
              <Input required placeholder="Россия" type="text" />{" "}
            </div>

            <Button variant="contained" type="submit">
              Далее:
            </Button>
          </form>
        </div>
        <div className="ProductPage">
          <div>
            <strong>
              <Link to="/cart">Корзина</Link>{" "}
            </strong>
            <Badge color="success" badgeContent={cartCount}>
              <ShoppingCart />
            </Badge>
          </div>

          {cart.products.map((item) => (
            <div key={item.product.id}>
              <p>
                {" "}
                Название: <strong>
                  {item.product.description}.
                </strong> <br /> Кол: <strong>{item.count}шт.</strong> <br />{" "}
                <span>
                  Цена: <strong>{item.subPrice}</strong>сом
                </span>{" "}
              </p>
              <Button
                type="submit"
                variant="contained"
                onClick={() => deleteCart(item.product.id)}
              >
                Убрать с корзины
              </Button>
            </div>
          ))}
          <p>
            <strong>Общая сумма: {cart.totalPrice}сом</strong>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default FormSale;
