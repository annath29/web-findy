
const postReducer = (state,action) =>{
    switch (action.type) {
        case 'SETPOSTS':
            return{
                ...state,
                posts:action.payload
            }
        case 'CREATEPOST':
            return{
                ...state,
                posts:[...state.posts,action.payload]
            }    
        case 'EDITPOSTLIKE':
            const {id,likes}=action.payload
            const editPostsLikes = [...state.posts];
            const editedLikes=editPostsLikes.map((post)=>  post.id == id ?  {...post,likes} : post)
            return{
                ...state,
                posts:editedLikes
            }    
        case 'EDITPOST':
            const {idPost,editPost}=action.payload
            const editPosts = [...state.posts];
            const edited=editPosts.map((post)=>  post.id == idPost ?  {...post,...editPost} : post)
            return{
                ...state,
                posts:edited
            }    
        default:
            return state;
    }
}

export default postReducer