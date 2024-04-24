import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { createComment } from "../../services/commentServices";
import { useAppContext } from "../../context/AppContext";

const FormComments = ({post,idUser}) => {
  const{comments:{commentsDispatch},posts:{postsDispatch}}=useAppContext();

  const currentDate = new Date();
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours}:${minutes}`;

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Debe agregar un comentario"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const comment= {
        "id_post":post.id,
        "id_user":idUser,
        "content":values.comment,
        "date":formattedDate,
        "hour":formattedTime
      }

      const response =await createComment(comment,post);
      if (response) {
        commentsDispatch({ type: "CREATECOMMENTS", payload: response });
        resetForm();
        // post.comments.push(response)
        // postsDispatch({type: "EDITPOST", payload:{idPost:post.id,updatePost:post }})
      } else {
        alert("Error al publicar comentario");
      }
    },
  });
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        justifyContent:'space-between',
        margin:'2px',
        background:'white', 
        borderRadius:'20px',
    
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <FormControl error={formik.touched.comment && formik.errors.comment ?true:false} variant="standard" sx={{ flexGrow: 1 }}>
        <TextField
          id='comment'
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          fullWidth
          placeholder="Ingrese su comentario"
          {...formik.getFieldProps("comment")}
        />
        {/* {formik.touched.comment && formik.errors.comment ?<FormHelperText id="email-text" color='primary'>{formik.errors.comment}</FormHelperText>:null} */}
      </FormControl>
      {formik.touched.comment && formik.errors.comment ? null:<Button
        variant="contained"
        disableElevation
        color="secondary"
        type='submit'
      >
        <SendIcon color="primary" />
      </Button>}

    </Box>
  );
};

export default FormComments;
