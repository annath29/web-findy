
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
        case 'EDITPOST':
            const {id,editPost}=action.payload
            const editPosts = [...state.posts];
            const edited=editPosts.map((post)=>  post.id == id ?  {...post,...editPost} : post)
            return{
                ...state,
                posts:edited
            }    
        default:
            return state;
    }
}

export default postReducer