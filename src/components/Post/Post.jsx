import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box} from '@mui/material';
import shareIcon from '../../assets/share.svg'
import commentsIcon from '../../assets/comments.svg'
import MediaCard from '../MediaCard/MediaCard';
import { getUser} from '../../services/usersService';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Post = ({post={}}) => {  

  const{user,posts}=useAppContext();
  console.log(post)
  console.log(posts.posts.posts)
  const [profileInfo,setProfileInfo]=React.useState();
  const navigate = useNavigate();

  React.useEffect(()=>{
    getUser(post.id_profile).then ((response)=>{
      setProfileInfo(response)
    }).catch((e)=>console.log(e))
  },[]);

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
    navigate(`/details/${idPost}`)
  }
  

  return (
    <Card sx={{ margin:'1rem'}}>
      <CardHeader
        avatar={
          <Link to={`/profile/${profileInfo?.id}`}>
            <Avatar src={profileInfo?.profile_photo} sx={{width:'30px', height:'30px', border: "2px solid #ff74fc"}}/>
          </Link>
        }
        title={<Typography variant='h6' sx={{fontWeight:'bold'}}>{profileInfo?.name}</Typography>}
      />
      <MediaCard post={post}></MediaCard>
      <CardActions disableSpacing sx={{alignItems:"start",padding:'8px 8px 0px 8px'}}>
        <IconButton onClick={()=>handleLike(post.id,user.user.user.id)} aria-label="add to favorites" sx={{display:'flex', flexDirection:'column'}}>
          {post.likes.includes(user.user.user.id) ? (
              <FavoriteIcon color='primary' sx={{ width: '28px', height: '28px' }} />
            ) : (
              <FavoriteBorderIcon color='text' sx={{ width: '28px', height: '28px' }} />
            )
          }
          <Typography variant='body2' color="text.dark">{post.likes.length}</Typography>
        </IconButton>
        <IconButton onClick={()=>handleButtonClick(post.id)} aria-label="comments" sx={{display:'flex', flexDirection:'column'}}>
          <Box component="img" src={commentsIcon} ></Box>
          <Typography variant='body2'color="text.dark" mt={0.5}>{post.comments.length}</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{display:'flex', flexDirection:'column'}}>
          <Box component="img" src={shareIcon}></Box>
          <Typography variant='body2' color="text.dark" mt={0.5}>{post.share.length}</Typography>
        </IconButton>
        <ExpandMore
        >
          <BookmarkIcon sx={{width:'30px',height:'30px'}} color='primary' />
        </ExpandMore>
      </CardActions>
      <CardContent sx={{padding:'0px 8px',display:'flex',flexDirection:'row'}}>
        <Typography variant="body2">
            <Typography mr={1} variant="h6" sx={{fontWeight:'bold'}} display="inline">
                {profileInfo?.name}
            </Typography>
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post