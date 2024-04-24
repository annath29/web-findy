const URL_BASE=`http://localhost:3000/`;
const endpoint={
    getUser: (idUser)=>`${URL_BASE}users/${idUser}`,
    userByEmailAndPassword:(email,password) =>`${URL_BASE}users?email=${email}&password=${password}`,
    getAllUsers:`${URL_BASE}users`,
    getPost: (idPost)=>`${URL_BASE}posts/?id=${idPost}`,
    getCommentsByIdPost: (idPost)=>`${URL_BASE}comments/?id_post=${idPost}`,
    updatePost: (idPost)=>`${URL_BASE}posts/${idPost}`,
    getAllPosts: `${URL_BASE}posts`,
    getAllcomments: `${URL_BASE}comments`,
    getPostByIdUser:(idUser) => `${URL_BASE}posts/?id_profile=${idUser}`,
    postsByCategory: (category) => `${URL_BASE}posts?category=${category}`,
};
export default endpoint;