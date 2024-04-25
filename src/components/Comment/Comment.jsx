import { Avatar, Box, CardHeader, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../services/usersService";

const Comment = ({ comment }) => {
  const [commentProfile, setCommentProfile] = useState();
  useEffect(() => {
    getUser(comment.id_user)
      .then((response) => {
        setCommentProfile(response);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Box sx={{display:'flex',padding:'18px'}}>
      <Box sx={{marginRight:'1rem'}}>
        <Link to={`/profile/${commentProfile?.id}`}>
          <Avatar
            src={commentProfile?.profile_photo}
            sx={{ width: "30px", height: "30px", border: "2px solid #ff74fc" }}
          />
        </Link>
      </Box>
      <Box>
      <Typography variant="h8" sx={{ fontWeight: "bold" }}>
          {commentProfile?.name}
        </Typography>
      <Typography variant="body1">
          {comment.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
