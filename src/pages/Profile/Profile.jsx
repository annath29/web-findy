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
      const allCategories = post.map(item => item.category);
      const categories = new Set(allCategories);
      return [...categories];
    }

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
          width="428"
          height="227"
          sx={{ borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
        >
          <CardMedia
            component="img"
            alt={userData.name}
            image={userData.cover_photo}
          />
          <CardContent sx={{ position: "relative", textAlign: "center" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Stack
                direction="column"
                alignItems="center"
                sx={{ pl: "8vw", pt: "0.1vw" }}
              >
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
                  width: "18vw",
                  height: "18vw",
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-10vw",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              />
              <Stack
                direction="column"
                alignItems="center"
                sx={{ pr: "8vw", pt: "0.1vw" }}
              >
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
          <CardActions>
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

        <FilterButtons/>

          <div>
            {userPosts.map((post) => (
              <div key={post.id}>
                <img src={post.image} alt={post.description} />
                <p>{post.description}</p>
              </div>
            ))}
          </div>

    </div>
  );
};

export default Profile;
