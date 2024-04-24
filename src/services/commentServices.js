import axios from "axios";
import endpoint from "./endpoint";

export const createComment = async (commentData, post) => {
  try {
    const { data } = await axios.post(endpoint.getAllcomments, commentData);
    post.comments.push(data.id);
    await axios.put(endpoint.updatePost(data.id_post), post);
    return data;
  } catch (error) {
    console.error("Error al enviar el commntario:", error);
    return null;
  }
};

export const getCommentsByPostIdSort = async (idPost) => {
  try {
    const { data } = await axios.get(endpoint.getCommentsByIdPost(idPost));

    const parseDateTime = (date, time) => {
      const [day, month, year] = date.split("/");
      const [hours, minutes] = time.split(":");
      return new Date(`${month}/${day}/${year} ${hours}:${minutes}`);
    };

    const sortedComments = data.sort((a, b) => {
      const dateTimeA = parseDateTime(a.date, a.hour);
      const dateTimeB = parseDateTime(b.date, b.hour);
      return dateTimeB - dateTimeA;
    });

    return sortedComments;
  } catch (error) {
    console.error("Error al traer commentarios por idPost:", error);
    return [];
  }
};
