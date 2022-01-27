import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../contexts/AdminProvider";
import { Button } from "@mui/material";
import { DeleteForever, EditLocationSharp, EditOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function AdminTable() {
  const { getProducts, jewerlys, deleteProduct } =
    React.useContext(AdminContext);

  React.useEffect(() => {
    getProducts();
  }, []);

  if (!jewerlys) {
    return <h2>Loading...</h2>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jewerlys.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button
                  onClick={() => deleteProduct(item.id)}
                  color="error"
                  variant="contained"
                  startIcon={<DeleteForever />}
                ></Button>
              </TableCell>
              <TableCell component="th" scope="row">
                <Link to={`/admin-panel/edit/${item.id}`}>
                  <Button
                    color="warning"
                    variant="contained"
                    startIcon={<EditOff />}
                  ></Button>
                </Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell colSpan={1} align="right">
                <img src={item.images[0]} width={80} alt={item.name} />
                <img src={item.images[1]} width={80} alt={item.name} />
                <img src={item.images[2]} width={80} alt={item.name} />
                <img src={item.images[3]} width={80} alt={item.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
