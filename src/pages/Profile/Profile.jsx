import React, { useState, useEffect, useCallback } from "react";
import { getUser } from "../../services/userServices";
import { getPosts } from "../../services/postServices";
// import { getPostsByCategory } from "../../services/postServices";
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
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import FilterButtons from "../../components/Profile/FilterButtons";
import { useAppContext } from "../../context/AppContext";
import { red, orange } from "@mui/material/colors";

const color = red[100];

const Profile = ({ userId = "52af" }) => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const { post } = useAppContext();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const data = await getUser(user?.state?.user?.id);
  //     setUserData(data);
  //   };

  //   if (user?.state?.isAuth && user?.state?.user) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  const fetchUserData = async () => {
    try {
      const data = await getUser(userId);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getCategories = (post) => {
    const allCategories = post.map((item) => item.category);
    const categories = new Set(allCategories);
    return [...categories];
  };

  const fetchUserPosts = useCallback(() => {
    getPosts()
      .then((response) => {
        const userPosts = response.filter((post) => post.id_profile === userId);
        setUserPosts(userPosts);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, []);

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      {userData && (
        <Card
          sx={{
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            overflow: "hidden",
            background:`linear-gradient(45deg, ${red[100]} 10%, white, ${orange[100]} 90%)`
          }}
        >
          <CardMedia
            component="img"
            alt={userData.name}
            image={userData.cover_photo}
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
              sx={{ width: "100%", justifyContent: "space-between"}}
              >
              <Stack direction="column" alignItems="center">
                <Typography variant="body1" color="text.secondary">
                  {userData.followers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Stack>
              <Avatar
                alt="Me"
                src={userData.profile_photo}
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginTop: "1vw", marginBottom: "4vw" }}
            >
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.description}
            </Typography>
          </CardContent>
          <CardActions sx={{
            paddingBottom: 8
            }}>
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
              <Button variant="contained" size="small" sx={{ width: "50%" }}>
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
          mt: -5
        }}
      >
        <FilterButtons />

        <div style={{ margin: '0 auto', maxWidth: '95%' }}>
          <ImageList
            sx={{ width: "100%", height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {userPosts.map((post) => (
              <ImageListItem key={post.id}>
                <img
                  src={`${post.content}?w=161&fit=crop&auto=format`}
                  alt={post.description}
                  loading="lazy"
                  style={{borderRadius: '20px'}}
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
