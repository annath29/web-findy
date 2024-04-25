import { Stack, Button } from "@mui/material";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { getPosts } from "../../services/postServices";
import { getPostsByCategory } from "../../services/postServices";

const styleBox = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  padding: "10px",
};

const FilterButtons = () => {
  const {
    posts,
  } = useAppContext();


  console.log(posts.posts.categories)

  const handleFilter = async (category) => {
    const filteredposts =
      category === "all"
        ? await getPosts()
        : await getPostsByCategory(category);
    const isActiveFilter = category === "all" ? false : true;
    console.log("object",filteredposts )
    posts.postsDispatch({
      type: "FILTERPOSTS",
      payload: {
        posts: filteredposts,
        isActiveFilter,
      },
    });
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {
      posts.posts.categories?.map((item, index) => ( 
        <Button
        sx={{
          border: "none",
          backgroundColor: "transparent",
          color: 'black',
        }}
          key={index}
          color="secondary"
          onClick={posts.posts.categories?.length >0 ?() => handleFilter(item): () => handleFilter("all")}
        >
          {item == 'image'? 'photo':item}
        </Button>

      ))
    }
      
      {/* <Button
        onClick={() => handleFilter("video")}
        sx={{
          border: "none",
          backgroundColor: "transparent",
          color: 'black',
        }}
      >
        Video
      </Button>
      <Button
        onClick={() => handleFilter("tag")}
        sx={{
          border: "none",
          backgroundColor: "transparent",
          color: 'black',
        }}
      >
        Album
      </Button>
      <Button
      sx={{
        border: "none",
        backgroundColor: "transparent",
        color: 'black',
      }}>
        Tag
      </Button> */}
    </Stack>
  );
};

export default FilterButtons;