import axios from "axios";
import endpoint from "./endpoint";

export const getPosts = async () => {
  try {
    const { data } = await axios.get(endpoint.getAllPosts);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getPost = async (idPost) => {
  try {
    const { data } = await axios.get(endpoint.getPost(idPost));
    return data.length ? data[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(endpoint.getAllPosts, postData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el post:", error);
    return null;
  }
};

export const getPostsByCategory = async (category) => {
  try {
    const { data } = await axios.get(endpoint.postsByCategory(category));
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPostsByUser= async (idUser) => {
  try {
    const { data } = await axios.get(endpoint.getPostByIdUser(idUser));
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
