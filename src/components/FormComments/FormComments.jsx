import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const FormComments = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico invalido")
        .required("Por favor digite un correo"),
      password: Yup.string().required("Por favor digite la contraseña"),
    }),
    onSubmit: async (values) => {
      const user = await getUserByEmailAndPassword(values);
      if (user) {
        saveInfoIntoStorage(user);
        userDispatch({ type: "LOGIN", payload: user });
        navigate("/");
      } else {
        alert("Por favor verifique sus credenciales");
      }
    },
  });
  return (
    //     <FormControl error={formik.touched.email && formik.errors.email ?true:false} variant="standard">
    //     <InputLabel htmlFor="email">Correo Electronico</InputLabel>
    //     <Input
    //       id="email"
    //       aria-describedby="email-text"
    //       {...formik.getFieldProps("email")}
    //     />
    //     {formik.touched.email && formik.errors.email ?<FormHelperText id="email-text">{formik.errors.email}</FormHelperText>:null}
    //   </FormControl>
    //   <Button variant="contained" disableElevation type='submit'>
    //     Iniciar sesión
    //   </Button>
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
      <FormControl error={false} variant="standard" sx={{ flexGrow: 1 }}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          fullWidth
          placeholder="Ingrese su comentario"
          id="fullWidth"
        />
      </FormControl>
      <Button
        variant="contained"
        disableElevation
        type="submit"
        color="secondary"
      >
        <SendIcon color="primary" />
      </Button>
    </Box>
  );
};

export default FormComments;
