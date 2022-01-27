import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Avatar, Badge } from "@mui/material";
import { Search, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";
import { userAuthContext, useUserAuth } from "../contexts/UserAuthContext";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const { cartCount, getProducts } = React.useContext(ClientContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const search = new URLSearchParams(window.location.search);
  const [searchValue, setSearchValue] = React.useState(search.get("q") || "");
  const navigate = useNavigate();
  const filterProdusts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    getProducts();
  };
  const { user, logOut, unsubscribe, setError } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      unsubscribe();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              SHINING
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            SHINING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/admin-panel/add">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                ADD PRODUCTS
              </Button>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/admin-panel">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block" }}
                >
                  ADMIN PANEL
                </Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <div className="search-box">
              <input
                value={searchValue}
                onChange={(e) => filterProdusts("q", e.target.value)}
                className="search-input"
                type="text"
                placeholder="Search jewerly..."
              />
              <Link to="#" className="search-btn">
                <Search />
              </Link>
            </div>
            <Link to="/cart">
              <IconButton color="warning" size="large">
                <Badge color="success" badgeContent={cartCount}>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
            {user ? (
              <>
                <IconButton size="small" color="inherit">
                  {user.displayName}
                </IconButton>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
                <IconButton onClick={handleLogout} size="large" color="inherit">
                  Log out
                </IconButton>
              </>
            ) : (
              <Link to="/login" size="small" color="inherit">
                Login
              </Link>
            )}
            {/* {user ? (
              <div>
                <span>{user && user.email}</span>
                <Button variant="primary" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )} */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
