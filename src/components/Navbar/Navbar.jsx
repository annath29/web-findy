import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormPost from "../../pages/FormPost/FormPost.jsx";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const style = {
  width: "80vw",
  bgcolor: "background.paper",
  margin: "0px 20px",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`/`);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleClickHome}
          >
            <HomeIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="secondary" aria-label="open drawer">
            <SearchIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={handleOpen}>
            <StyledFab color="primary" aria-label="add">
              <AddIcon color="secondary" />
            </StyledFab>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title"color='primary' variant="h5" sx={{textAlign:'center',marginBottom:'2rem'}}>
                Nueva Publicación
              </Typography>
              <FormPost handleClose={handleClose}></FormPost>
            </Box>
          </Modal>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="secondary">
            <NotificationsIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Link to={`/profile/${user.user.user?.id}`}>
            <Avatar
              src={user.user.user?.profile_photo}
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
