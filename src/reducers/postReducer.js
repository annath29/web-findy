
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
            editPosts.map((post)=>  post.id == id ?  {...post,...editPost} : post)
            return{
                ...state,
                posts:editPosts
            }    
        default:
            return state;
    }
}

export default postReducer