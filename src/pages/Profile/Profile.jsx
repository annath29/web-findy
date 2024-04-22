import React, { useState, useEffect } from "react";
// import { getPosts } from '../../services/postServices';
import { getUser } from "../../services/userServices";
import { getPosts } from "../../services/postServices";
import { getPostsByCategory } from "../../services/postServices";
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
  Select,
  MenuItem,
} from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";

const Profile = ({ userId = "52af" }) => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterTag, setFilterTag] = useState("all");

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const data = await getUser(user?.state?.user?.id);
  //     setUserData(data);
  //   };

  //   if (user?.state?.isAuth && user?.state?.user) {
  //     fetchUserData();
  //   }
  // }, [userId]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const posts = await getPosts();
        const userPosts = posts.filter((post) => post.id_profile === userId);
        setUserPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const handleFilterChange = async () => {
    try {
      const posts = await getPostsByCategory(filterType);
      setUserPosts(
        posts.filter((post) => {
          if (filterType !== "all" && post.category !== filterType)
            return false;
          if (filterTag !== "all" && !post.tags.includes(userId)) return false;
          return true;
        })
      );
    } catch (error) {
      console.error("Error fetching filtered posts:", error);
    }
  };

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
            <Avatar
              alt="Me"
              src={userData.profile_photo}
              sx={{
                width: '18vw',
                height: '18vw',
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: '50%',
                position: "absolute",
                top: "-10vw",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            />
            <Typography gutterBottom variant="h5" component="div">
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Follow</Button>
            <Button size="small">Message</Button>
          </CardActions>
        </Card>
      )}

      <div>
        <h2>Filtrar Publicaciones</h2>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="image">Imágenes</MenuItem>
          <MenuItem value="video">Videos</MenuItem>
          <MenuItem value="album">Álbumes</MenuItem>
        </Select>
        <Select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <MenuItem value="all">Todas las etiquetas</MenuItem>
          <MenuItem value={userId}>Mis Publicaciones</MenuItem>
        </Select>
        <Button onClick={handleFilterChange}>Aplicar filtro</Button>
      </div>

      {userPosts.length > 0 && (
        <div>
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {userPosts.map((post) => (
              <ImageListItem key={post.id}>
                <img
                  src={post.content[0]}
                  alt={post.description}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      )}
    </div>
  );
};

export default Profile;
