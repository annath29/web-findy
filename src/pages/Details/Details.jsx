import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../../services/postServices';
import {Avatar, Box, CardHeader, IconButton, Typography } from '@mui/material';
import MediaCard from '../../components/MediaCard/MediaCard';
import { getUser } from '../../services/usersService';
import { useAppContext } from '../../context/AppContext';
import commentsIcon from '../../assets/comments.svg';
import shareIcon from '../../assets/share.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormComments from '../../components/FormComments/FormComments';

const Details = () => {
  const {idPost} = useParams();
  const [post,setPost]=useState();
  const [profileInfo,setProfileInfo]=useState();
  const{user,posts}=useAppContext();

  useEffect(()=>{
    getPost(idPost).then ((response)=>{
     setPost(response)
    }).catch((e)=>console.error(e))
  },[])

  useEffect(()=>{
    if(post){
      getUser(post.id_profile).then ((response)=>{
        setProfileInfo(response)
      }).catch((e)=>console.log(e))
    }
  },[post]);

  const handleLike = (idPost,idUser) => {
    if(post.likes.includes(idUser)){
      const indexToDelete = post.likes.findIndex(item => item === idUser);
      if (indexToDelete !== -1) {
          post.likes.splice(indexToDelete, 1);
      }

    }
    else{
      post.likes.push(idUser)
    }
    posts.postDispatch({
      type:'EDITPOSTLIKE',
      payload:{
        id:idPost,
        likes: post.likes
      },
    })
  };
  const handleButtonClick = (idPost) => {
    // navigate(`/details/${idPost}`)
    console.log("enfocar en form")
  }
  

  return (
    <Box component="div"
      sx={{
        height:'100vh',
        background: `radial-gradient(50% 50% at 50% 50%, rgba(255, 118, 116, 0.6) 0%, rgba(255, 118, 116, 0) 100%)`,
        backgroundRepeat: 'repeat',
      }}
    >
      <Box sx={{ position:'relative', display:'flex',flexDirection:'column',alignItems:'center' }}>
        <Box component="div" sx={{height:'60vh',borderRadius: '10px',borderBottomLeftRadius: '10%',borderBottomRightRadius: '10%', overflow: 'hidden' }}>
          <MediaCard sx={{height:'100%'}} post={post} height="100%"/>
        </Box>     
        <CardHeader sx={{position:'absolute',padding:'10px 16px',bottom:'-30px' ,width:'80vw', borderRadius: '20px',backgroundColor:'#ffffff'}}
          avatar={
            <Link to={`/profile/${profileInfo?.id}`}>
              <Avatar src={profileInfo?.profile_photo} sx={{width:'50px', height:'50px', border: "2px solid #ff74fc"}}/>
            </Link>
          }
          title={<Typography variant='h6' sx={{fontWeight:'bold'}}>{profileInfo?.name}</Typography>}
          action={
            <Box component="div" sx={{display:'flex', flexDirection:'row'}}>
              <IconButton onClick={()=>handleLike(post.id,user.user.user.id)} aria-label="add to favorites" sx={{display:'flex', flexDirection:'column'}}>
                {post?.likes.includes(user.user.user.id) ? (
                    <FavoriteIcon color='primary' sx={{ width: '28px', height: '28px' }} />
                  ) : (
                    <FavoriteBorderIcon color='text' sx={{ width: '28px', height: '28px' }} />
                  )
                }
                <Typography variant='body2' color="text.dark">{post?.likes.length}</Typography>
              </IconButton>
              <IconButton onClick={()=>handleButtonClick(post.id)} aria-label="comments" sx={{display:'flex', flexDirection:'column'}}>
                <Box component="img" src={commentsIcon} ></Box>
                <Typography variant='body2'color="text.dark" mt={0.5}>{post?.comments.length}</Typography>
              </IconButton>
              <IconButton aria-label="share" sx={{display:'flex', flexDirection:'column'}}>
                <Box component="img" src={shareIcon}></Box>
                <Typography variant='body2' color="text.dark" mt={0.5}>{post?.share.length}</Typography>
              </IconButton> 
            </Box>

          }
        />
      </Box>
  
      <Typography mt={4} sx={{padding:'8px'}} variant="body2">
            <Typography mr={1} variant="h6" sx={{fontWeight:'bold'}} display="inline">
                {profileInfo?.name}
            </Typography>
          {post?.description}
      </Typography>
      <CardHeader sx={{ padding:'10px 16px',bottom:'-30px',width:'100vw'}}
          avatar={
            <Link to={`/profile/${user.user.user?.id}`}>
              <Avatar src={user.user.user?.profile_photo} sx={{width:'50px', height:'50px', border: "2px solid #ff74fc"}}/>
            </Link>
          }
          title={
            <FormComments/>
          }
        />
    </Box>
  )
}

export default Details
