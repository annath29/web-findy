import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, SvgIcon } from '@mui/material';
import shareIcon from '../../assets/share.svg'
import commentsIcon from '../../assets/comments.svg'


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


const Post = ({post={name:'Jane kim'}}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ margin:'1rem'}}>
      <CardHeader
        avatar={
          <Avatar sx={{width:'30px', height:'30px', border: "2px solid #ff74fc"}}/>
        }
        title={<Typography variant='h6'>{post.name}</Typography>}
      />
      <CardMedia
        component="img"
        height="380"
        image={shareIcon}
        alt={`Post ${post.name}`}
      />
      <CardActions disableSpacing sx={{alignItems:"start",padding:'8px 8px 0px 8px'}}>
        <IconButton aria-label="add to favorites" sx={{display:'flex', flexDirection:'column'}}>
          <FavoriteBorderIcon color='text' sx={{width:'28px',height:'28px'}}/>
          <Typography variant='body2' color="text.dark">300</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{display:'flex', flexDirection:'column'}}>
          <Box component="img" src={commentsIcon} ></Box>
          <Typography variant='body2'color="text.dark" mt={0.5}>300</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{display:'flex', flexDirection:'column'}}>
          <Box component="img" src={shareIcon}></Box>
          <Typography variant='body2' color="text.dark" mt={0.5}>300</Typography>
        </IconButton>
        <ExpandMore
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <BookmarkIcon sx={{width:'30px',height:'30px'}} color='primary' />
        </ExpandMore>
      </CardActions>
      <CardContent sx={{padding:'0px 8px',display:'flex',flexDirection:'row'}}>
        <Typography variant="body2">
            <Typography mr={1} variant="h7" component="h2" display="inline">
                {post.name}
            </Typography>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post