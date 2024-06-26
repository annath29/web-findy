import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import logo from "../../assets/favicon.png";
import messageIcon from "../../assets/messageIcon.svg";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Post from "../../components/Post/Post";
import { useAppContext } from "../../context/AppContext";
import { getPosts } from "../../services/postServices";
import { getUsers } from "../../services/usersService";

const Home = () => {

  const {user,posts, users} = useAppContext();
  
  React.useEffect(()=>{
    getPosts().then ((response)=>{
      posts.postsDispatch({
        type:'SETPOSTS',
        payload:response,
      })
    }).catch((e)=>console.log(e))
  },[])

  React.useEffect(()=>{
    getUsers().then ((response)=>{
      users.usersDispatch({
        type:'SETUSERS',
        payload:response,
      })
      
      const usersFollowed=response?.filter(item => user.user.user.followed.includes(item.id));
      users.usersDispatch(
        {
          type:'FILLFRIENDS',
          payload:usersFollowed,
        }
      )
    }).catch((e)=>console.log(e))
  },[])
  
  const usersPosts= [...users.users.friends,user.user.user]
  const postsFollowed = posts.posts.posts.filter(post =>
    usersPosts?.some(user => user.id === post.id_profile)
  ).reverse();
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
                <FavoriteBorderIcon sx={{fontSize: 28,fontWeight:'bold'}} color="text" />                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="primary">
                <Box component="img" src={messageIcon}></Box>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{
        backgroundImage: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 118, 116, 0.6) 0%, rgba(255, 118, 116, 0) 100%)',
        backgroundRepeat: 'repeat',
        minHeight: '100vh', 
        marginBottom:'5rem'
      }}>
        <Stack mt={2} ml={2} direction="row" spacing={2} overflow="hidden">
          <Box sx={{ position: "relative" }} direction="column">
            <Avatar alt="Remy Sharp" src={user.user.user.profile_photo} sx={{width:'64px', height:'64px', position: "relative", borderRadius: "50%", border: "2px solid #ff74fc"}} />
            <Avatar alt="Remy Sharp" sx={{ width:'64px', height:'64px', position: "absolute", top:0, backgroundColor: "rgba(43, 43, 43, 0.3)",}}>
              <AddIcon/> 
            </Avatar>
            <Typography textAlign="center" fontSize={12}>Your Story</Typography>
          </Box>
          {/* <Box>
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
          </Box> */}
          {
            users.users.friends?.map((item)=>(
              item.id != user.user.user.id ?
              <Box key={item.id}>
                <Avatar alt="Travis Howard"  src={item.profile_photo} sx={{ width:'64px', height:'64px', borderRadius: "50%", border: "2px solid #ff74fc"}}/>
                <Typography textAlign="center" fontSize={12}>{item.name}</Typography>
              </Box>:null   
            ))
          }
        </Stack>
        {
          postsFollowed?.map((item)=>(
            <Post key={item.id} post={item}/>
          ))
        }
        
      </Box>
    </>
  );
};

export default Home;
