import Layout from '../layout/Layout'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Details from '../pages/Details/Details'
import FormPost from '../pages/FormPost/FormPost'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function AppRoutes() {
 
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route element={<PrivateRoutes/>}>
          <Route path='Details' element={<Details/>}/>
          <Route path='FormPost' element={<FormPost/>}/>
          <Route path='Home' element={<Home/>} />
          <Route path='Profile' element={<Profile/>} />
        </Route>
        <Routes element={<PublicRoutes/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>} />
        </Routes>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes
