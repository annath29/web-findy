const URL_BASE=`http://localhost:3000/`;
const endpoint={
    getUser: (idUser)=>`${URL_BASE}users/${idUser}`,
    userByEmailAndPassword:(email,password) =>`${URL_BASE}users?email=${email}&password=${password}`,
    getAllUsers:`${URL_BASE}users`,
    getPost: (idUser)=>`${URL_BASE}posts/?id_profile=${idUser}`,
    getAllPosts: `${URL_BASE}posts`
};
export default endpoint;