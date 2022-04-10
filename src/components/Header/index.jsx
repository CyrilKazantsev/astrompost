import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Link } from 'react-router-dom';
import "./style.css"

const pages = ['Ваши посты', 'Избранное', 'Личный блог'];
const settings = ['Профиль', 'Аккаунт', 'Настройки', 'Выход'];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const currentUser = useContext(CurrentUserContext)

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

  return (
    <AppBar style={{ background: "var(--main-color)", position: "static", color: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily:'Nunito', fontSize: "25px"}}
          >
            <Link to={"/"} className="card__link">
            <h3>ASTROM POSTS</h3>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/"} className="card__link">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Astrom Posts
            </Typography>
          </Link>
          <Link to={"/myposts"} className="card__link">
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                <Button 
                  sx={{
                    display: "inline-block",
                    color: "black",
                    padding: "15px 30px",
                    margin: "10px 20px",
                    borderRadius: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    backgroundImage: "linear-gradient(to right, #9EEFE1 0%, #33d9b2 51%, #9EEFE1 100%)",
                    backgroundSize: "100% auto",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .1)",
                    transition: ".5s",
                  }}
                >
                  Ваши посты
                </Button>
              </Box>
            </Link> 
            <Link to={"/favorites"} className="card__link">
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                <Button
                  sx={{
                    display: "inline-block",
                    color: "black",
                    padding: "15px 30px",
                    margin: "10px 20px",
                    borderRadius: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    backgroundImage: "linear-gradient(to right, #9EEFE1 0%, #33d9b2 51%, #9EEFE1 100%)",
                    backgroundSize: "100% auto",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .1)",
                    transition: ".5s",
                  }}
                >
                  Избранные посты
                </Button>
              </Box>
            </Link> 

            <Link to={"/"} className="card__link">
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                <Button
                  sx={{
                    display: "inline-block",
                    color: "black",
                    padding: "15px 30px",
                    margin: "10px 20px",
                    borderRadius: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    backgroundImage: "linear-gradient(to right, #9EEFE1 0%, #33d9b2 51%, #9EEFE1 100%)",
                    backgroundSize: "100% auto",
                    boxShadow: "0 0 20px rgba(0, 0, 0, .1)",
                    transition: ".5s",
                  }}
                >
                  На главную
                </Button>
              </Box>
            </Link> 
          <Box sx={{padding: "10px"}}>
            <p>{currentUser.name}</p>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/createpost"} className="card__link">
            <Box>
              <Button
                sx={{
                  textDecoration: "none",
                  display: "inline-block",
                  color: "black",
                  padding: "10px 20px",
                  margin: "10px 20px",
                  borderRadius: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  backgroundImage: "linear-gradient(to right, #9EEFE1 0%, #33d9b2 51%, #9EEFE1 100%)",
                  backgroundSize: "100% auto",
                  boxShadow: "0 0 20px rgba(0, 0, 0, .1)",
                  transition: ".5s",
                  fontSize: "10px"
                }}
              >
                Создать пост
              </Button>
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};