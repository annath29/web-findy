
const commentsReducer = (state,action) => {
    switch (action.type) {
        case 'SETCOMMENTS':
            return{
                ...state,
                comments:action.payload
            }
        case 'CREATECOMMENTS':
            return{
                ...state,
                comments:[...state.comments,action.payload]
            }
    
        default:
            return state
    }
}

export default commentsReducer