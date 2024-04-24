import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { getUserByEmailAndPassword } from '../../services/usersService';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from "@mui/material";


const FormPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const{users}=useAppContext();
  
    
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      tag: '',
      content:'',
    },
    validationSchema: Yup.object({
      tag: Yup.string().required('seleccione una opción'),
      content:Yup.string().required("Por favor ingrese una descripcion")
    }),
    onSubmit: async(values) => {
      // const user= await getUserByEmailAndPassword(values);
      // if(user){
      //   saveInfoIntoStorage(user)
      //   userDispatch({type:'LOGIN',payload:user})
      //   navigate("/")
      // }
      // else{
      //   alert("Por favor verifique sus credenciales")
      // }
      console.log(values)
    },
  });
  const filteredUsers = users.users.friends?.filter(user =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  return (
    <Box
    component="form"
    sx={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    noValidate
    autoComplete="off"
    onSubmit={formik.handleSubmit}
  >
   
    <FormControl sx={{marginBottom:'1rem'}}error={formik.touched.tag && formik.errors.tag?true:false} variant="standard">
      <InputLabel htmlFor="tag"></InputLabel>
      <Autocomplete
      id="tag"
      value={selectedUser}
      onChange={(event, newValue) => {
        event.preventDefault()
        console.log("newvalue",newValue)
        setSelectedUser(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        event.preventDefault()
        setInputValue(newInputValue);
      }}
      options={filteredUsers}
      getOptionLabel={(user) => user.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
        /> )}
        />
      {formik.touched.tag && formik.errors.tag?<FormHelperText id="content-text">{formik.errors.content}</FormHelperText>:null}
    </FormControl>
    <FormControl sx={{marginBottom:'1rem'}}error={formik.touched.content && formik.errors.content?true:false} variant="standard">
      <InputLabel htmlFor="content">Descripcion</InputLabel>
      <Input
        id="content"
        aria-describedby="content-text"
        {...formik.getFieldProps("content")}
      />
      {formik.touched.content && formik.errors.content?<FormHelperText id="content-text">{formik.errors.content}</FormHelperText>:null}
    </FormControl>
    <Button variant="contained"  disableElevation type='submit'>
      Iniciar sesión
    </Button>
  </Box>
  );
};

export default FormPost;
