
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
            const {idPost,updatePost}=action.payload
            const editPosts = [...state.posts];
            const edited=editPosts.map((post)=>  post.id == idPost ?  {...post,...updatePost} : post)
            return{
                ...state,
                posts:edited
            }
        case 'FILLCATEGORIES':
            return{
                ...state,
                categories:action.payload
            }
        case "FILTERPOSTS":
            return {
            ...state,
            posts: action.payload.posts,
            isActiveFilter: action.payload.isActiveFilter,
            };    
        default:
            return state;
    }
}

export default postReducer