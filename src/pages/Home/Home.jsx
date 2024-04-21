import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import logo from "../../assets/favicon.png";
import avatar from "../../assets/avatar.jpg";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Post from "../../components/Post/Post";

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const name = "url('../../assets/avatar.jpg')";
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "secondary.main" }}>
          <Toolbar>
            <Box component="img" src={logo} alt={"logo"} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "flex", md: "block" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={0} color="primary">
                  <FavoriteBorderIcon color="text" />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="primary">
                  <ForumOutlinedIcon color="text" />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <Box sx={{
        backgroundImage: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 118, 116, 0.6) 0%, rgba(255, 118, 116, 0) 100%)',
        backgroundRepeat: 'repeat',
        minHeight: '100vh', 
      }}>
        <Stack mt={2} ml={2} direction="row" spacing={2} overflow="hidden">
          <Box sx={{ position: "relative" }} direction="column">
            <Avatar alt="Remy Sharp" src={avatar} sx={{width:'64px', height:'64px', position: "relative", borderRadius: "50%", border: "2px solid #ff74fc"}} />
            <Avatar alt="Remy Sharp" sx={{ width:'64px', height:'64px', position: "absolute", top:0, backgroundColor: "rgba(43, 43, 43, 0.3)",}}>
              <AddIcon/>
            </Avatar>
            <Typography textAlign="center" fontSize={12}>Your Story</Typography>
          </Box>
          <Box>
            <Avatar 
              alt="Travis Howard"
              src={avatar}
              sx={{
                width:'64px',
                height:'64px',
                borderRadius: "50%",
                border: "2px solid #ff74fc",
                //  borderImageSource: `radial-gradient(circle at 100% 100%, #ffbc74 18%, #ff74fc 39%, #ff7674 67%, #ff74b7 100%)`,
                //  borderImageSlice: 1,
              }}
            ></Avatar>
            <Typography textAlign="center" fontSize={12}>Name</Typography>
          </Box>
          <Box>
            <Avatar alt="Travis Howard"  src={avatar} sx={{ width:'64px', height:'64px', borderRadius: "50%", border: "2px solid #ff74fc"}}/>
            <Typography textAlign="center" fontSize={12}>Name</Typography>
          </Box>
          <Box>
            <Avatar alt="Travis Howard"  src={avatar} sx={{ width:'64px', height:'64px', borderRadius: "50%", border: "2px solid #ff74fc"}}/>
            <Typography textAlign="center" fontSize={12}>Name</Typography>
          </Box>
          <Box>
            <Avatar alt="Travis Howard"  src={avatar} sx={{ width:'64px', height:'64px', borderRadius: "50%", border: "2px solid #ff74fc"}}/>
            <Typography textAlign="center" fontSize={12}>Name</Typography>
          </Box>       
        </Stack>
        <Post/>
        <Post/>
      </Box>
    </>
  );
};

export default Home;
