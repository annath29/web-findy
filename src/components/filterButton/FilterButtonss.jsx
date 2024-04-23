import { Box, Button } from "@mui/material";
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
        posts: Filteredposts,
        isActiveFilter,
      },
    });
  };

  return (
    <Box sx={styleBox}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleFilter()}
        sx={{
          backgroundColor: "#76e8ba",
          borderColor: "#76e8ba",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#76e8ba",
            fontWeight: "800",
          },
        }}
      >
        All
      </Button>
      {categories.map((item, index) => (
        <Button
          key={index}
          variant="contained"
          color="secondary"
          onClick={() => handleFilter(item)}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};

export default FilterButtons;