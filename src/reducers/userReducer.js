
const userReducer = (state,action) =>{
    switch (action.type) {
        case 'LOGIN':
            return{
                ...state,
                user:action.payload,
                isAuth:true,
            }
        case 'LOGOUT':
            return{
                ...state,
                user:null,
                isAuth:false,
            }
        case 'REGISTER':
            return{
                ...state,
                users:[...state.users,action.payload],
                //isAuth:false,
            }
        default:
            return state
    }
}

export default userReducer