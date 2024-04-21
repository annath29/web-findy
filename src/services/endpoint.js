const URL_BASE=`http://localhost:3000/`;
const endpoint={
    getUser: (idUser)=>`${URL_BASE}users/${idUser}`,
    getPost: (idUser)=>`${URL_BASE}posts/?id_profile=${idUser}`,
    getAllPosts: `${URL_BASE}posts`
};
export default endpoint;