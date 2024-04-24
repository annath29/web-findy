const usersReducer = (state,action) =>{
    switch (action.type) {
        case 'REGISTER':
            return{
                ...state,
                users:[...state.users,action.payload],
            }
        case 'SETUSERS':
            return{
                ...state,
                users:action.payload
            }
            case 'FILLFRIENDS':
                return{
                    ...state,
                    friends:action.payload
                }
    }
}

export default usersReducer