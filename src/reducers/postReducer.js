
const postReducer = (state,action) =>{
    switch (action.type) {
        case 'SETPOST':
            return{
                ...state,
                posts:action.payload
            }
        case 'CREATEPOST':
            return{
                ...state,
                posts:[...state.posts,action.payload]
            }    
        case 'EDITPOST':
            const {id,editPost}=action.payload
            const editPosts = [...state.posts];
            const edited=editPosts.map((post)=>  post.id == id ?  {...post,...editPost} : post)
            return{
                ...state,
                posts:edited
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