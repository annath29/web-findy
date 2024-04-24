import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';



const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Navbar = () => {
  const { user} = useAppContext();
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate(`/`)
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar  position="fixed" color="primary" sx={{ top: 'auto', bottom: 0,  borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <Toolbar>
          <IconButton color="secondary" aria-label="open drawer" onClick={handleClickHome}>
            <HomeIcon/>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="secondary" aria-label="open drawer">
            <SearchIcon/>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <StyledFab color="primary" aria-label="add" >
            <AddIcon color="secondary" />
          </StyledFab>
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
}


export default Navbar


