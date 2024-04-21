
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
        case 'EDITPROFILE':
            const editProfile=action.payload
            return{
                ...state,
                user:editProfile,
                //isAuth:false,<
            }
        default:
            return state
    }
}

export default userReducer