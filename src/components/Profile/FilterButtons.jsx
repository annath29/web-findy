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
    //   {categories.map((item, index) => (
    //     <Button
    //       key={index}
    //       variant="contained"
    //       color="secondary"
    //       onClick={() => handleFilter(item)}
    //     >
    //       {item}
    //     </Button>
    //   ))}

    <Stack direction="row" spacing={2} justifyContent="center">
    <Button
      onClick={() => handleFilter("photo")}
      sx={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      Photo
    </Button>
    <Button
      onClick={() => handleFilter("video")}
      sx={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      Video
    </Button>
    <Button
      onClick={() => handleFilter("album")}
      sx={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      Album
    </Button>
    <Button>
        Tag
    </Button>
  </Stack>

    
  );
};

export default FilterButtons;
