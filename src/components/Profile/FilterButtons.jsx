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

const FilterButtons = ({ categories = [] }) => {
  const {
    post: { postDispatch },
  } = useAppContext();

  const handleFilter = async (category = "all") => {
    const Filteredposts =
      category === "all"
        ? await getPosts()
        : await getPostsByCategory(category);
    const isActiveFilter = category === "all" ? false : true;
    postDispatch({
      type: "FILTERPOSTS",
      payload: {
        post: Filteredposts,
        isActiveFilter,
      },
    });
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {/* {categories.map((item, index) => (
        <Button
          key={index}
          variant="contained"
          color="secondary"
          onClick={() => handleFilter(item)}
        >
          {item}
        </Button>
      ))} */}
      <Button
        onClick={() => handleFilter("image")}
        sx={{
          border: "none",
          backgroundColor: "transparent",
          color: 'black',
        }}
      >
        Photo
      </Button>
      <Button
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
      </Button>
    </Stack>
  );
};

export default FilterButtons;
