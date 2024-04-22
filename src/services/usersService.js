import axios from "axios";
import endpoint from "./endpoint";

export const getUser = async (idUser) =>{
    try {
        const { data } = await axios.get(endpoint.getUser(idUser));
        return data
    } catch (error) {
        console.log(error);
        return null
    }
}

export const getUsers = async () =>{
    try {
        const { data } = await axios.get(endpoint.getAllUsers);
        return data
    } catch (error) {
        console.log(error);
        return []
    }
}