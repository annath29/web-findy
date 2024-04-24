import React from "react";
import Carrusel from "../Carrusel/Carrusel";
import { CardMedia } from "@mui/material";

const MediaCard = ({ post = {}, height }) => {
  if (post.category === "image") {
    return (
      <CardMedia
        component="img"
        height={height??"380"}
        image={post.content[0]}
        alt={`Post ${post.id}`}
      />
    );
  } else if (post.category === "video") {
    return (
      <CardMedia
        component="video"
        height="380"
        src={post.content[0]}
        controls
        title={`Post ${post.id}`}
      />
    );
  } else if (post.category === "album") {
    return (
      <CardMedia
        component="div" // Usar un div en lugar de una imagen para permitir la inserción de diferentes tipos de contenido
        height="380"
      >
        <Carrusel images={post.content} />
      </CardMedia>
    );
  } else {
    return (
      <CardMedia
        component="div" // Usar un div en lugar de una imagen para permitir la inserción de diferentes tipos de contenido
        height="380"
      >
        <p>Error: Tipo de contenido no válido</p>;
      </CardMedia>
    );
  }
};

export default MediaCard;
