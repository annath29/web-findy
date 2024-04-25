import React, { useEffect,useState } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  ImageList,
  ImageListItem,
  CardActions,
  CardMedia,
  Card,
  Typography,
  CardContent,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import FilterButtons from "../../components/FilterButton/FilterButton";
import { red, orange } from "@mui/material/colors";
import { getPostsByUser } from "../../services/postServices";

const Profile = () => {
  const { user,posts } = useAppContext();
  const [followers, setFollowers] = useState(10);
  // console.log("posts", posts);
  // console.log("posts.cartegory", posts.posts.categories);

  const handleFollow = () => {
    setFollowers(prevFollowers => prevFollowers + 1);
  };

  const getCategories = (allPosts) => {
    const allCategories = allPosts.map((item) => item.category);
    const categories = new Set(allCategories);
    return [...categories];
  };
  const [userPost,setUserPost]=useState()
  useEffect(() => {
    getPostsByUser(user.user.user.id)
      .then((response) => {
        console.log("response",response)
        const categories = getCategories(response);
        // posts.postsDispatch({
        //   type: "SETPOSTS",
        //   payload: response,
        // });
        setUserPost(response)
        posts.postsDispatch({
          type: "FILLCATEGORIES",
          payload: categories,
        });
      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <div>
      {user.user.user && (
        <Card
          sx={{
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            overflow: "hidden",
            background: `linear-gradient(45deg, ${red[100]} 10%, white, ${orange[100]} 90%)`,
          }}
        >
          <CardMedia
            component="img"
            alt={user.name}
            image={user.user.user.cover_photo}
          />
          <CardContent
            sx={{
              position: "relative",
              textAlign: "center",
              background: `linear-gradient(45deg, ${red[100]} 10%, white, ${orange[100]} 90%)`,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Stack direction="column" alignItems="center">
                <Typography variant="body1" color="text.secondary">
                  {followers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Stack>
              <Avatar
                alt="Me"
                src={user.user.user.profile_photo}
                sx={{
                  width: 80,
                  height: 80,
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              />
              <Stack direction="column" alignItems="center">
                <Typography variant="body1" color="text.secondary">
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Likes
                </Typography>
              </Stack>
            </Stack>
            <Typography>Hola</Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginTop: "1vw", marginBottom: "4vw" }}
            >
              {user.user.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.user.user.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              paddingBottom: 8,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <Button variant="contained" size="small" sx={{ width: "50%" }} onClick={handleFollow}>
                Follow
              </Button>
              <Button variant="contained" size="small" sx={{ width: "50%" }}>
                Message
              </Button>
            </Stack>
          </CardActions>
        </Card>
      )}
      <Card
        width={428}
        height={227}
        sx={{
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          overflow: "hidden",
          mt: -5,
        }}
      >
        
        <FilterButtons/>

        <div style={{ margin: "0 auto", maxWidth: "95%" }}>
          <ImageList
            sx={{ width: "100%", height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {userPost?.map((post) => (
              <ImageListItem key={post.id}>
                <img
                  src={`${post.content[0]}`}
                  // alt={post.id}
                  loading="lazy"
                  style={{ borderRadius: "20px" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
