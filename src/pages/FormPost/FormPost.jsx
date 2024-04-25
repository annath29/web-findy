import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../../context/AppContext";
import { MenuItem, Select } from "@mui/material";
import { createPost } from "../../services/postServices";

const FormPost = ({ handleClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, user , posts:{postsDispatch} } = useAppContext();
  
  
  const formik = useFormik({
    initialValues: {
      tag: "",
      description: "",
      category: "",
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required(
        "Por favor ingrese el url del contenido a subir"
      ),
      category: Yup.string().required("seleccione una opción"),
      description: Yup.string().required("Por favor ingrese una descripcion"),
    }),
    onSubmit: async (values) => {
      const category = values.category === "photo" ? "image" : values.category;
      const newPost = {
        "content": [values.content],
        "id_profile": user.user.user?.id,
        "description":values.description,
        "category": category,
        "tags": [values.tag],
        "likes": [],
        "comments": [],
        "share": [],
      };
      const post= await createPost(newPost);
      if(post){
        postsDispatch({type:'CREATEPOST',payload:post})
        handleClose();
      }
      else{
        alert("Por favor verifique sus credenciales")
      }
      // console.log(values);
    },
  });

  const filteredUsers = users.users.friends?.filter((user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} error>
        <InputLabel id="category">Categoria</InputLabel>
        <Select
          labelId="category"
          id="tcategory"
          label="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderValue={(value) => `${value}`}
          {...formik.getFieldProps("category")}
        >
          <MenuItem value={"photo"}>Photo</MenuItem>
          <MenuItem value={"video"}>Video</MenuItem>
          <MenuItem value={"album"}>Album</MenuItem>
        </Select>

        {formik.touched.category && formik.errors.category ? (
          <FormHelperText id="category-text">
            {formik.errors.category}
          </FormHelperText>
        ) : null}
      </FormControl>
      <FormControl
        sx={{ marginBottom: "1rem" }}
        error={formik.touched.content && formik.errors.content ? true : false}
        variant="standard"
      >
        <InputLabel htmlFor="content">Contenido</InputLabel>
        <Input
          id="content"
          aria-describedby="content-text"
          {...formik.getFieldProps("content")}
        />
        {formik.touched.content && formik.errors.content ? (
          <FormHelperText id="content-text">
            {formik.errors.content}
          </FormHelperText>
        ) : null}
      </FormControl>
      <FormControl
        sx={{ marginBottom: "1rem" }}
        error={
          formik.touched.description && formik.errors.description ? true : false
        }
        variant="standard"
      >
        <InputLabel htmlFor="description">Descripcion</InputLabel>
        <Input
          id="description"
          aria-describedby="description-text"
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <FormHelperText id="description-text">
            {formik.errors.description}
          </FormHelperText>
        ) : null}
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        error={formik.touched.tag && formik.errors.tag ? true : false}
      >
        <InputLabel id="tag">Etiqueta</InputLabel>
        <Select
          labelId="tag"
          id="tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
          label="tag"
          renderValue={(value) => `${value}`}
          {...formik.getFieldProps("tag")}
        >
          <MenuItem value={""}>{}</MenuItem>;
          {filteredUsers?.map((item) => {
            return <MenuItem value={item.name}>{item.name}</MenuItem>;
          })}
        </Select>
        {formik.touched.tag && formik.errors.tag ? (
          <FormHelperText id="tag-text">{formik.errors.tag}</FormHelperText>
        ) : null}
      </FormControl>

      <Button variant="contained" disableElevation type="submit">
        Crear
      </Button>
    </Box>
  );
};

export default FormPost;
