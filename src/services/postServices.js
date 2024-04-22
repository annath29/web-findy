import axios from "axios";
import endpoint from "./endpoint";


export const getPosts = async() => {
    try {
        const { data } = await axios.get(endpoint.getAllPosts);
        return data
    } catch (error) {
        console.log(error);
        return []
    }
}